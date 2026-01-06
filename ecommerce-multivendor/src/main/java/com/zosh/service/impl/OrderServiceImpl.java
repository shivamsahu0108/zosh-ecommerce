package com.zosh.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.zosh.Modal.Address;
import com.zosh.Modal.Cart;
import com.zosh.Modal.CartItem;
import com.zosh.Modal.Order;
import com.zosh.Modal.OrderItem;
import com.zosh.Modal.User;
import com.zosh.Repository.AddressRepository;
import com.zosh.Repository.OrderItemRepository;
import com.zosh.Repository.OrderRepository;
import com.zosh.domain.OrderStatus;
import com.zosh.domain.PaymentStatus;
import com.zosh.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);
        if (!user.getId().equals(order.getUser().getId())) {
            throw new RuntimeException("you are not authorized to cancel this order...");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
        if (!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }

        @SuppressWarnings("null")
        Address address = addressRepository.save(shippingAddress);

        // brand 1 => 4 shirt
        // brand 2 => 3 pants
        // brand 3 => 1 watch
        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));
        Set<Order> orders = new HashSet<>();
        for (Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()) {
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();

            int totalOrderPrice = items.stream().mapToInt(
                    CartItem::getSellingPrice).sum();
            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            Order cratedOrder = new Order();
            cratedOrder.setUser(user);
            cratedOrder.setSellerId(sellerId);
            cratedOrder.setTotalMrpPrice(totalOrderPrice);
            cratedOrder.setTotalSellingPrice(totalOrderPrice);
            cratedOrder.setTotalItem(totalItem);
            cratedOrder.setShippingAddress(address);
            cratedOrder.setOrderStatus(OrderStatus.PENDING);
            cratedOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

            Order savedOrder = orderRepository.save(cratedOrder);
            orders.add(savedOrder);

            List<OrderItem> orderItems = new ArrayList<>();

            for (CartItem item : items) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                orderItem.setSellingPrice(item.getSellingPrice());

                savedOrder.getOrderItems().add(orderItem);

                OrderItem savedOrderItem = orderItemRepository.save(orderItem);
                orderItems.add(savedOrderItem);
            }
        }
        return orders;
    }

    @SuppressWarnings("null")
    @Override
    public Order findOrderById(Long id) throws Exception {
        return orderRepository.findById(id).orElseThrow(() -> new Exception("order not found..."));
    }

    @Override
    public List<Order> sellersOrder(Long sellerId) {

        return orderRepository.findBySellerId(sellerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> usersOrdersHistory(Long userId) {

        return orderRepository.findByUserId(userId);
    }

    @SuppressWarnings("null")
    @Override
    public OrderItem getOrderItemById(Long id) throws Exception {

        return orderItemRepository.findById(id).orElseThrow(() -> new Exception("order item not exist..."));
    }

}
