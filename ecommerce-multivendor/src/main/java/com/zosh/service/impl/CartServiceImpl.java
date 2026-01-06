package com.zosh.service.impl;

import org.springframework.stereotype.Service;

import com.zosh.Modal.Cart;
import com.zosh.Modal.CartItem;
import com.zosh.Modal.Product;
import com.zosh.Modal.User;
import com.zosh.Repository.CartItemRepository;
import com.zosh.Repository.CartRepository;
import com.zosh.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);
        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);
            int totalPrice = quantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice((int) (quantity * product.getMrpPrice()));
            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);
            return cartItemRepository.save(cartItem);
        }
        return isPresent;
    }

    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());

        int totalPrice = 0;
        int totalDiscountPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice();
            totalDiscountPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }
        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalSellingPrice(totalDiscountPrice);
        cart.setTotalItem(totalItem);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountPrice));
        return cart;
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice <= 0) {
            return 0;
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }
}
