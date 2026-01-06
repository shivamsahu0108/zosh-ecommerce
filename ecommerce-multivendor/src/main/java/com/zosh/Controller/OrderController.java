package com.zosh.Controller;

import com.razorpay.PaymentLink;
import com.zosh.Modal.*;
import com.zosh.Repository.PaymentOrderRepository;
import com.zosh.service.*;
import org.springframework.web.bind.annotation.*;

import com.zosh.Response.PaymentLinkResponse;
import com.zosh.domain.PaymentMethod;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

  private final OrderService orderService;
  private final UserService userService;
  private final CartService cartService;
   private final PaymentService paymentService;

//  private final OrderItemService orderItemService;
  private final SellerService sellerService;
  private final SellerReportService sellerReportService;
  private final PaymentOrderRepository paymentOrderRepository;

  @GetMapping("/user")
  public ResponseEntity<List<Order>> getUsersOrdersHistory(
      @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    List<Order> orders = orderService.usersOrdersHistory(user.getId());
    return new ResponseEntity<>(orders, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<PaymentLinkResponse> createOrderHandler(
      @RequestBody Address shippingAddress,
      @RequestParam PaymentMethod paymentMethod,
      @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Cart cart = cartService.findUserCart(user);
    Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);

     PaymentOrder paymentOrder = paymentService.createOrder(user,orders);
    PaymentLinkResponse res = new PaymentLinkResponse();
     if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
         PaymentLink paymentLink = paymentService.createRazorPayPaymentLink(user,
         paymentOrder.getAmount(),
         paymentOrder.getId());

         String paymentUrl = paymentLink.get("short_url");
         String paymentUrlId = paymentLink.get("id");
         res.setPayment_link_url(paymentUrl);
         paymentOrder.setPaymentLinkId(paymentUrlId);
         paymentOrderRepository.save(paymentOrder);
     } else {
         String paymentUrl = paymentService.createStripePaymentLink(user,
         paymentOrder.getAmount(),
         paymentOrder.getId());
         res.setPayment_link_url(paymentUrl);
     }
    return new ResponseEntity<>(res, HttpStatus.OK);
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<Order> getOrderById(
      @PathVariable Long orderId,
      @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Order order = orderService.findOrderById(orderId);
    return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
  }
  @GetMapping("/item/{orderItemId}")
  public ResponseEntity<OrderItem> getOrderItemById(
      @PathVariable Long orderItemId,
      @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    OrderItem orderItem = orderService.getOrderItemById(orderItemId);
    return new ResponseEntity<>(orderItem, HttpStatus.ACCEPTED);

  }

  @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(
        @PathVariable Long orderId,
        @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.cancelOrder(orderId, user);
        Seller seller = sellerService.getSellerById(order.getSellerId());
        SellerReport report = sellerReportService.getSellerReport(seller);

        report.setCanceledOrders(report.getCanceledOrders() + 1);
        report.setTotalRefunds(report.getTotalRefunds() + order.getTotalSellingPrice());
        sellerReportService.updateSellerReport(report);
        return ResponseEntity.ok(order);
    }

}
