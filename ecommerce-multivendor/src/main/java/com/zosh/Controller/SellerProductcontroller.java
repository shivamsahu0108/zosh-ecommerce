package com.zosh.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.Modal.Product;
import com.zosh.Modal.Seller;
import com.zosh.exceptions.ProductException;
import com.zosh.request.CreateProductRequest;
import com.zosh.service.ProductService;
import com.zosh.service.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seller/products")
public class SellerProductcontroller {
    private final ProductService productService;
    private final SellerService sellerService;

    @GetMapping
    public ResponseEntity<List<Product>> getProductBySllerId(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Product> products = productService.getProductBySellerId(seller.getId());
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody CreateProductRequest request,
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        Product product = productService.createProduct(request, seller);
     
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ProductException e) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long productId,
            @RequestBody Product product) throws ProductException {
        Product updatedProduct = productService.updateProduct(productId, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}