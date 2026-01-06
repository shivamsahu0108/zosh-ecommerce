package com.zosh.service.impl;

import org.springframework.stereotype.Service;

import com.zosh.Config.JwtProvider;
import com.zosh.Modal.User;
import com.zosh.Repository.UserRepository;
import com.zosh.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) {
        String email = jwtProvider.getEmailFormJwtToken(jwt);
        User user = this.findUserByEmail(email);

        return user;
    }

    @Override
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null)
            throw new RuntimeException("User not found with this email - " + email);
        return user;
    }

}
