package com.zosh.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.Modal.Seller;
import com.zosh.domain.AccountStatus;

public interface SellerRepository extends JpaRepository<Seller, Long> {
  Seller findByEmail(String email);
  List<Seller> findByAccountStatus(AccountStatus accountStatus);

}
