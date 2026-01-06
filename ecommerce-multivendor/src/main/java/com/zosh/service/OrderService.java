package com.zosh.service;

import java.util.List;
import java.util.Set;

import com.zosh.Modal.Address;
import com.zosh.Modal.Cart;
import com.zosh.Modal.Order;
import com.zosh.Modal.OrderItem;
import com.zosh.Modal.User;
import com.zosh.domain.OrderStatus;

public interface OrderService {
    Set<Order> createOrder(User user, Address shippingAddress, Cart cart);

    Order findOrderById(Long id) throws Exception;

    List<Order> usersOrdersHistory(Long userId);

    List<Order> sellersOrder(Long sellerId);

    Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;

    Order cancelOrder(Long orderId, User user) throws Exception;

    OrderItem getOrderItemById(Long id) throws Exception;
}
