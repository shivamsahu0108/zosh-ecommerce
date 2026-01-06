package com.zosh.service;

import com.zosh.Modal.Cart;
import com.zosh.Modal.CartItem;
import com.zosh.Modal.Product;
import com.zosh.Modal.User;

public interface CartService {

    public CartItem addCartItem(
        User user,
        Product product, 
        String size,
        int quantity
    );
    public Cart findUserCart(User user);
    
}
