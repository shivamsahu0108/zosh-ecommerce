package com.zosh.service.impl;

import com.zosh.Modal.Product;
import com.zosh.Modal.User;
import com.zosh.Modal.WishList;
import com.zosh.Repository.WishlistRepository;
import com.zosh.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
    private final WishlistRepository wishlistRepository;
    @Override
    public WishList createWishList(User user) {
        WishList wishList = new WishList();
        wishList.setUser(user);

        return wishlistRepository.save(wishList);
    }

    @Override
    public WishList getWishListByUserId(User user) {
        WishList wishList =  wishlistRepository.findByUserId(user.getId());
        if (wishList == null) {
            wishList = createWishList(user);
        }
        return wishList;
    }

    @Override
    public WishList addProductToWishList(User user, Product product) {
        WishList wishList = getWishListByUserId(user);
        if (wishList.getProducts().contains(product)) {
            wishList.getProducts().remove(product);
        } else {
            wishList.getProducts().add(product);
        }
        return wishlistRepository.save(wishList);
    }
}
