package com.zosh.Controller;

import com.zosh.Modal.User;
import com.zosh.Modal.VerificationCode;
import com.zosh.Repository.UserRepository;
import com.zosh.Response.ApiResponse;
import com.zosh.Response.AuthResponse;
import com.zosh.Response.SignupRequest;
import com.zosh.domain.USER_ROLE;
import com.zosh.request.LoginOtpRequest;
import com.zosh.request.LoginRequest;
import com.zosh.service.AuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {
        String jwt = authService.createUser(req);
        if (jwt == null) {
            throw new Exception("User creation failed");
        }
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("User created successfully");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {
        authService.sendLoginOtp(req.getEmail(), req.getRole());
        ApiResponse res = new ApiResponse();

        res.setMessage("Otp sent successfully");

        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> LoginHandler(@RequestBody LoginRequest req) throws Exception {
        AuthResponse authResponse = authService.signing(req);

        return ResponseEntity.ok(authResponse);
    }
}
