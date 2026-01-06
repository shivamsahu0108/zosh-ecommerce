package com.zosh.Controller;

import com.zosh.Modal.Deal;
import com.zosh.Response.ApiResponse;
import com.zosh.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {
    private final DealService dealService;
    @GetMapping
    public ResponseEntity<List<Deal>> getDeals() {
        List<Deal> deals = dealService.getDeals();
        return new ResponseEntity<>(deals, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) throws Exception {
        Deal createdDeal = dealService.createDeal(deal);
        return new ResponseEntity<>(createdDeal, HttpStatus.ACCEPTED);
    }
    @PostMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(
            @RequestBody Deal deal,
            @PathVariable Long id
    ) throws Exception {
        Deal updatedDeal = dealService.updateDeal(deal, id);
        return ResponseEntity.ok(updatedDeal);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDeal(
            @PathVariable Long id
    ) throws Exception {
        dealService.deleteDeal(id);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Deal deleted successfully");

        return new ResponseEntity<>(apiResponse, HttpStatus.ACCEPTED);
    }
}
