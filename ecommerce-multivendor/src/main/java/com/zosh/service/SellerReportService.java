package com.zosh.service;

import com.zosh.Modal.Seller;
import com.zosh.Modal.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
