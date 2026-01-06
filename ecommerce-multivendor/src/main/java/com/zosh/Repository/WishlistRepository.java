package com.zosh.Repository;

import com.zosh.Modal.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<WishList,Long> {
    WishList findByUserId(Long userId);
}
