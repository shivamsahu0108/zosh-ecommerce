package com.zosh.service.impl;

import com.zosh.Modal.User;
import com.zosh.Repository.UserRepository;
import com.zosh.domain.USER_ROLE;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initializeAdminUser();
    }
    private void initializeAdminUser() {
        String adminUserName = "zoshbazzar@gmail.com";
        if(userRepository.findByEmail(adminUserName)==null){
            User adminUser = new User();
            adminUser.setPassword(passwordEncoder.encode("Admin123"));
            adminUser.setFullName("Admin");
            adminUser.setEmail(adminUserName);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);
            userRepository.save(adminUser);
        }
    }
}
