package com.zosh.service;

import com.zosh.Response.AuthResponse;
import com.zosh.Response.SignupRequest;
import com.zosh.domain.USER_ROLE;
import com.zosh.request.LoginRequest;

public interface AuthService {

  String sendLoginOtp(String email, USER_ROLE role) throws Exception;
  String createUser(SignupRequest req) throws Exception;
  AuthResponse signing(LoginRequest req) throws Exception;
}
