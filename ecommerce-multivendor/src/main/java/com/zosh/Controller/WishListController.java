package com.zosh.Controller;

import com.zosh.Modal.Product;
import com.zosh.Modal.User;
import com.zosh.Modal.WishList;
import com.zosh.service.ProductService;
import com.zosh.service.UserService;
import com.zosh.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishListController {
    private final WishlistService wishlistService;
    private final ProductService productService;
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<WishList> getWishListByUserId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WishList wishList = wishlistService.getWishListByUserId(user);
        return ResponseEntity.ok(wishList);
    }
    @PostMapping("/add-product/{productId}")
    public ResponseEntity<WishList> addProductToWishList(
            @PathVariable Long productId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Product product = productService.findProductById(productId);
        User user = userService.findUserByJwtToken(jwt);
        WishList wishList = wishlistService.addProductToWishList(user, product);
        return ResponseEntity.ok(wishList);
    }
}
