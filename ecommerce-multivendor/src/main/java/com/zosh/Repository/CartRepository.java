package com.zosh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.Modal.Cart;
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long id);
}
