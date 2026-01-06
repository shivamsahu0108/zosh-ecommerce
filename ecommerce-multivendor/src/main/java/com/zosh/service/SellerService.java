package com.zosh.service;

import java.util.List;

import com.zosh.Modal.Seller;
import com.zosh.domain.AccountStatus;
import com.zosh.exceptions.SellerException;

public interface SellerService {
    Seller getSellerProfile(String jwt) throws Exception;

    Seller CreateSeller(Seller seller) throws Exception;

    Seller getSellerById(Long id) throws SellerException;

    Seller getSellerByEmail(String email) throws Exception;

    List<Seller> getAllSellers(AccountStatus status) throws Exception;

    Seller updateSeller(Long id, Seller seller) throws Exception;

    void deleteSeller(Long id) throws Exception;

    Seller verifyEmail(String email, String otp) throws Exception;

    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception;
}
