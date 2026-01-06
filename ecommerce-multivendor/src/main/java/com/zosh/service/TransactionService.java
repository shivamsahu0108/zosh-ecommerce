package com.zosh.service;

import com.zosh.Modal.Order;
import com.zosh.Modal.Seller;
import com.zosh.Modal.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();

}
