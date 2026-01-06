package com.zosh.service;

import com.zosh.Modal.Product;
import com.zosh.Modal.User;
import com.zosh.Modal.WishList;

public interface WishlistService {
    WishList createWishList(User user);
    WishList getWishListByUserId(User user);
    WishList addProductToWishList(User user, Product product);

}
