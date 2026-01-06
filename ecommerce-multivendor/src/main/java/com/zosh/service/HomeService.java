package com.zosh.service;

import com.zosh.Modal.Home;
import com.zosh.Modal.HomeCategory;

import java.util.List;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);
}
