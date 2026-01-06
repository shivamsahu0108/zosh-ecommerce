package com.zosh.service;

import com.zosh.Modal.User;

public interface UserService {
    public User findUserByJwtToken(String jwt);
    public User findUserByEmail(String email);
}
