package com.zosh.service.impl;

import com.zosh.Modal.Deal;
import com.zosh.Modal.Home;
import com.zosh.Modal.HomeCategory;
import com.zosh.Repository.DealRepository;
import com.zosh.domain.HomeCategorySection;
import com.zosh.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {
    private final DealRepository dealRepository;
    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {

        List<HomeCategory> gridCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.GRID)
                .toList();
        List<HomeCategory> shopByCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
                .toList();
        List<HomeCategory> electricCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES)
                .toList();
        List<HomeCategory> dealsCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                .toList();
        List<Deal> creaetDeals = new ArrayList<>();
        if (dealRepository.findAll().isEmpty()) {
            List<Deal> deals = allCategories.stream()
                    .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                    .map(category -> new Deal(null, 10, category))
                    .toList();
            creaetDeals = dealRepository.saveAll(deals);
        } else {
            creaetDeals = dealRepository.findAll();
        }

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeals(creaetDeals);
        home.setDealCategories(dealsCategories);

        return home;
    }
}
