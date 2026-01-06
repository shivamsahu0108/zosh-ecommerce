package com.zosh.service.impl;

import com.zosh.Modal.Deal;
import com.zosh.Modal.HomeCategory;
import com.zosh.Repository.DealRepository;
import com.zosh.Repository.HomeCategoryRepository;
import com.zosh.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {
    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) throws Exception {
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId())
                .orElseThrow(() -> new Exception("Category Not Found"));
        Deal newDeal = dealRepository.save(deal);
        newDeal.setCategory(category);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepository.save(newDeal);
    }

    @Override
    public Deal updateDeal(Deal deal, Long id) throws Exception {
        Deal existingDeal = dealRepository.findById(id)
                .orElseThrow(() -> new Exception("Deal Not Found"));
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId())
                .orElseThrow(() -> new Exception("Category Not Found"));
        if (existingDeal!=null){
            if (deal.getCategory() != null){
                existingDeal.setDiscount(deal.getDiscount());
            }
            if (category!=null){
                existingDeal.setCategory(category);
            }
            return dealRepository.save(existingDeal);
        }
        throw new Exception("Deal Not Found");
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new Exception("Deal Not Found"));
        dealRepository.delete(deal);
    }
}
