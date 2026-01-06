package com.zosh.service.impl;

import com.zosh.Modal.HomeCategory;
import com.zosh.Repository.HomeCategoryRepository;
import com.zosh.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {
    private final HomeCategoryRepository homeCategoryRepository;
    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createHomeCategories(List<HomeCategory> homeCategories) {
        if (homeCategoryRepository.findAll().isEmpty()){
            return homeCategoryRepository.saveAll(homeCategories);
        }
        return homeCategoryRepository.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(Long id, HomeCategory category) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(()-> new Exception("Category Not Found"));
        if (category.getImage() != null) {
            existingCategory.setImage(category.getImage());
        }
        if (category.getCategoryId() != null) {
            existingCategory.setCategoryId(category.getCategoryId());
        }
        return homeCategoryRepository.save(existingCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
