package com.zosh.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.Modal.Cart;
import com.zosh.Modal.CartItem;
import com.zosh.Modal.Product;


public interface CartItemRepository extends JpaRepository<CartItem, Long>{
    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
