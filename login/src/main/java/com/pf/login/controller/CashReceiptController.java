package com.pf.login.controller;

import com.pf.login.dto.CashReceiptDto;
import com.pf.login.service.CashReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cash")
@CrossOrigin(origins = "*")
public class CashReceiptController {

    @Autowired
    private CashReceiptService cashReceiptService;

    @PostMapping("/save")
    public String saveCashReceipt(@RequestBody CashReceiptDto dto) {

        return cashReceiptService.saveCashReceipt(dto);
    }
}