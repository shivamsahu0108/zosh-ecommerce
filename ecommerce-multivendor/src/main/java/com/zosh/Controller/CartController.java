package com.zosh.Controller;

import com.zosh.Modal.Cart;
import com.zosh.Modal.CartItem;
import com.zosh.Modal.Product;
import com.zosh.Modal.User;
import com.zosh.Response.ApiResponse;
import com.zosh.exceptions.ProductException;
import com.zosh.request.AddItemRequest;
import com.zosh.service.CartItemService;
import com.zosh.service.CartService;
import com.zosh.service.ProductService;
import com.zosh.service.UserService;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final UserService userService;
    private final CartItemService cartItemService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestHeader("Authorization") String jwt,
            @RequestBody AddItemRequest req) throws ProductException, Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(req.getProductId());
        CartItem item = cartService.addCartItem(user, product, req.getSize(), req.getQuantity());
        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to cart successfully");
        return new ResponseEntity<>(item, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItemHandler(@RequestHeader("Authorization") String jwt,
            @PathVariable Long cartItemId) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);
        ApiResponse res = new ApiResponse();
        res.setMessage("Item removed from cart successfully");
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(@RequestHeader("Authorization") String jwt,
            @PathVariable Long cartItemId, @RequestBody CartItem cartItem) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        CartItem updateCartItem = null;
        if (cartItem.getQuantity() > 0) {
            updateCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
        }
        return new ResponseEntity<>(updateCartItem, HttpStatus.ACCEPTED);
    }

}
