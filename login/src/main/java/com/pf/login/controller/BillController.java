package com.pf.login.controller;

import com.pf.login.entity.RBillOne;
import com.pf.login.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bill")
@CrossOrigin
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/save")
    public ResponseEntity<?> saveBill(@RequestBody RBillOne billRequest) {

        try {
            Long rvno = billService.saveBill(billRequest);
            return ResponseEntity.ok(rvno);
        } catch (RuntimeException ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());   // 🔥 sends plain text to frontend
        }
    }

    // 🔹 NEW API → Fetch latest bill using MAX(RVNO)
    @GetMapping("/latest")
    public ResponseEntity<RBillOne> getLatestBill() {

        RBillOne bill = billService.getLatestBill();

        if (bill == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(bill);
    }
}