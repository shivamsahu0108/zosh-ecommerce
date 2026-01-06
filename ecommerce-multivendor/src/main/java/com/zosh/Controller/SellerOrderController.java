package com.zosh.Controller;

import com.zosh.Modal.Order;
import com.zosh.Modal.Seller;
import com.zosh.domain.OrderStatus;
import com.zosh.service.OrderService;
import com.zosh.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
public class SellerOrderController {
    private final OrderService orderService;
    private final SellerService sellerService;

    @GetMapping()
    public ResponseEntity<List<Order>> getSellerOrdersHandler(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Order> orders = orderService.sellersOrder(seller.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("{orderId}/status/{orderStatus}")
    public ResponseEntity<Order> updateOrderHandler(
            @PathVariable Long orderId,
            @PathVariable OrderStatus orderStatus,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Order order = orderService.updateOrderStatus(orderId, orderStatus);
        return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
    }
}
