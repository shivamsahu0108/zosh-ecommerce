package com.zosh.service;

import com.zosh.Modal.Product;
import com.zosh.Modal.Review;
import com.zosh.Modal.User;
import com.zosh.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {
    Review createReview(CreateReviewRequest req,
                        User user,
                        Product product);
    List<Review> getReviewsByProductId(Long productId);
    Review updateReview(
            Long reviewId,
            String reviewText,
            double rating,
            Long userId
    ) throws Exception;
    void deleteReview(Long reviewId, Long userId) throws Exception;
    Review getReviewById(Long reviewId) throws Exception;
}
