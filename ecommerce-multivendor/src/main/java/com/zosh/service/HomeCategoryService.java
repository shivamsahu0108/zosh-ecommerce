package com.zosh.service;

import com.zosh.Modal.HomeCategory;

import java.util.List;

public interface HomeCategoryService {
    HomeCategory createHomeCategory(HomeCategory homeCategory);
    List<HomeCategory> createHomeCategories(List<HomeCategory> homeCategories);
    HomeCategory updateHomeCategory(Long id, HomeCategory homeCategory) throws Exception;
    List<HomeCategory> getAllHomeCategories();
}
