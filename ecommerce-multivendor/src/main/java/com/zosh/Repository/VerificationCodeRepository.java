package com.zosh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.Modal.VerificationCode;
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {

    VerificationCode findByEmail(String email);
    VerificationCode findByOtp(String otp);

}
