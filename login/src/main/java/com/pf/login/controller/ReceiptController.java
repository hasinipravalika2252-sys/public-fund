package com.pf.login.controller;

import com.pf.login.dto.ReceiptRequestDto;
import com.pf.login.service.ReceiptService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @PostMapping("/cda")
    public String saveCdaReceipt(@RequestBody ReceiptRequestDto dto) {
        receiptService.saveCdaReceipt(dto);
        return "Receipt from CDA saved successfully";
    }
}
