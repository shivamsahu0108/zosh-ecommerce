package com.zosh.Controller;

import java.util.List;

import com.zosh.Modal.SellerReport;
import com.zosh.service.SellerReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.Modal.Seller;
import com.zosh.Modal.VerificationCode;
import com.zosh.Repository.VerificationCodeRepository;
import com.zosh.Response.AuthResponse;
import com.zosh.domain.AccountStatus;
import com.zosh.exceptions.SellerException;
import com.zosh.request.LoginRequest;
import com.zosh.service.AuthService;
import com.zosh.service.EmailService;
import com.zosh.service.SellerService;
import com.zosh.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {

    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final EmailService emailService;
    private final SellerReportService sellerReportService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(
            @RequestBody LoginRequest req) throws Exception {
        String otp = req.getOtp();
        String email = req.getEmail();

        req.setEmail("seller_" + email);
        System.out.println("Email: " + email + " OTP: " + otp);
        AuthResponse authResponse = authService.signing(req);
        return ResponseEntity.ok(authResponse);
    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(
            @PathVariable String otp) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);
        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Invalid OTP");
        }
        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);
        return new ResponseEntity<>(seller, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Seller> createSeller(
            @RequestBody Seller seller) throws Exception {
        Seller savedSeller = sellerService.CreateSeller(seller);
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(seller.getEmail());
        verificationCodeRepository.save(verificationCode);

        String subject = "zosh bazaar Email Verification code";
        String text = "Welcome to zosh bazaar, verify your account using this link ";
        String frontend_url = "http://localhost:3000/verify-seller/";
        emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject,
                text + frontend_url);
        return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws SellerException {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Seller>> getAllSellers(
            @RequestParam(required = false) AccountStatus status) throws Exception {
        System.out.println("Status: " + status);
        List<Seller> sellers = sellerService.getAllSellers(status);
        System.out.println("Sellers: " + sellers);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping()
    public ResponseEntity<Seller> updateSeller(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Seller seller) throws Exception {
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);
    }
    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSeller(
            @PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
