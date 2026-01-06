package com.zosh.Repository;

import com.zosh.Modal.Seller;
import com.zosh.Modal.SellerReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
    SellerReport findBySellerId(Long sellerId);
}
