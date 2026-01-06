package com.zosh.service.impl;

import com.zosh.Modal.CartItem;
import com.zosh.Modal.User;
import com.zosh.Repository.CartItemRepository;
import com.zosh.service.CartItemService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {
    private final CartItemRepository cartItemRepository;

    @Override
    public void removeCartItem(Long userId, Long cartItemid) throws Exception {

        CartItem item = findCartItemById(cartItemid);

        User cartItemUser = item.getCart().getUser();

        if (cartItemUser.getId().equals(userId)) {
            cartItemRepository.delete(item);
        } else
            throw new Exception("You can't remove this cart item");

    }

    @SuppressWarnings("null")
    @Override
    public CartItem findCartItemById(Long id) throws Exception {
        return cartItemRepository.findById(id).orElseThrow(() -> new Exception("Cart item not found with id " + id));
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
        CartItem item = findCartItemById(id);

        User cartItemUser = item.getCart().getUser();

        if (cartItemUser.getId().equals(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setMrpPrice((int) (item.getQuantity() * item.getProduct().getMrpPrice()));
            item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());
            return cartItemRepository.save(item);
        }
        throw new Exception("You can't update this cart item");
    }
}
