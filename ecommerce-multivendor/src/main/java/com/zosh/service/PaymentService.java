package com.zosh.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.zosh.Modal.Order;
import com.zosh.Modal.PaymentOrder;
import com.zosh.Modal.User;

import java.util.Set;

public interface PaymentService {
    PaymentOrder createOrder(User user, Set<Order> orders);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException;
    PaymentLink createRazorPayPaymentLink(User user, Long amount, long orderId);
    String createStripePaymentLink(User user, Long amount, long orderId);
}
