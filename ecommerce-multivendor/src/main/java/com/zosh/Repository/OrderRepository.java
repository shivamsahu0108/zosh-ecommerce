package com.zosh.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.Modal.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByUserId(Long userld);

    List<Order> findBySellerId(Long sellerld);

}
