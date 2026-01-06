package com.zosh.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zosh.Config.JwtProvider;
import com.zosh.Modal.Cart;
import com.zosh.Modal.Seller;
import com.zosh.Modal.User;
import com.zosh.Modal.VerificationCode;
import com.zosh.Repository.CartRepository;
import com.zosh.Repository.SellerRepository;
import com.zosh.Repository.UserRepository;
import com.zosh.Repository.VerificationCodeRepository;
import com.zosh.Response.AuthResponse;
import com.zosh.Response.SignupRequest;
import com.zosh.domain.USER_ROLE;
import com.zosh.request.LoginRequest;
import com.zosh.service.AuthService;
import com.zosh.service.EmailService;
import com.zosh.utils.OtpUtil;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final CartRepository cartRepository;
  private final JwtProvider jwtProvider;
  private final VerificationCodeRepository verificationCodeRepository;
  private final EmailService emailService;
  private final SellerRepository sellerRepository;

  private final CustomUserServiceImpl customUserService;

  @Override
  public String sendLoginOtp(String email, USER_ROLE role) throws Exception {
    String SIGNIN_PREFIX = "signing_";
    if (email.startsWith(SIGNIN_PREFIX)) {
      email = email.substring(SIGNIN_PREFIX.length());
      if (role.equals(USER_ROLE.ROLE_SELLER)) {
        Seller seller = sellerRepository.findByEmail(email);
        if (seller == null) {
          throw new Exception("Seller not found");
        }
      } else {
        User user = userRepository.findByEmail(email);
        if (user == null) {
          throw new Exception("User not exist with provided email");
        }
      }

    }
    String otp = OtpUtil.generateOtp();
    VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);

    if (verificationCode == null) {
      verificationCode = new VerificationCode();
      verificationCode.setEmail(email);
    }

    verificationCode.setOtp(otp);
    verificationCodeRepository.save(verificationCode);

    System.out.println("OTP sent to " + email + " : " + otp);

    String subject = "zosh bazaar login/signup otp";
    String text = "your login/signup otp is - " + otp;
    try {
      emailService.sendVerificationOtpEmail(email, otp, subject, text);
    } catch (MessagingException e) {
      throw new RuntimeException("Failed to send OTP email", e);
    }
    return "OTP sent successfully";
  }

  @Override
  public String createUser(SignupRequest req) throws Exception {

    VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
    if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
      throw new Exception("wrong otp");
    }

    User user = userRepository.findByEmail(req.getEmail());

    if (user == null) {
      User createdUser = new User();
      createdUser.setEmail(req.getEmail());
      createdUser.setFullName(req.getFullName());
      createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
      createdUser.setMobile("9470748484");
      createdUser.setPassword(passwordEncoder.encode(req.getOtp()));
      user = userRepository.save(createdUser);
      Cart cart = new Cart();
      cart.setUser(user);
      cartRepository.save(cart);
    }
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));
    Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    return jwtProvider.generateToken(authentication);
  }

  @Override
  public AuthResponse signing(LoginRequest req) throws Exception {
    String username = req.getEmail();
    String otp = req.getOtp();

    Authentication authentication = authenticate(username, otp);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String token = jwtProvider.generateToken(authentication);
    AuthResponse authResponse = new AuthResponse();
    authResponse.setJwt(token);
    authResponse.setMessage("Login successful");

    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
    authResponse.setRole(USER_ROLE.valueOf(roleName));
    return authResponse;

  }

  private Authentication authenticate(String username, String otp) throws Exception {

    UserDetails userDetails = customUserService.loadUserByUsername(username);
    String SELLER_PREFIX = "seller_";
    if (username.startsWith(SELLER_PREFIX)) {
      username = username.substring(SELLER_PREFIX.length());
    }
    if (userDetails == null) {
      throw new BadCredentialsException("Invalid username or password");
    }
    VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);
    System.out.println("Verification Code: " + verificationCode);
    if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
      System.out.println("Invalid OTP");
      throw new Exception("Invalid OTP");
    }
    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
  }

}
