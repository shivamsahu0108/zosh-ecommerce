package com.zosh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.Modal.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
