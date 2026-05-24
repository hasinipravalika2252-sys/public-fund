package com.pf.login.controller;

import com.pf.login.entity.ReceiptOne;
import com.pf.login.dto.ReceiptRequestDto;
import com.pf.login.dto.ReceiptBillDto;
import com.pf.login.service.ReceiptService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    // ✅ Save CDA Receipt
    @PostMapping("/cda")
    public String saveCdaReceipt(@RequestBody ReceiptRequestDto dto) {
        receiptService.saveCdaReceipt(dto);
        return "Receipt from CDA saved successfully";
    }

    // ✅ Save PCDA Receipt (NEW API)
    @PostMapping("/pcda")
    public String savePcdaReceipt(@RequestBody ReceiptRequestDto dto) {
        receiptService.savePcdaReceipt(dto);
        return "Receipt from PCDA saved successfully";
    }

    // ✅ Latest Receipt (NOW RETURNS contno ALSO)
    @GetMapping("/latest")
    public Map<String, Object> getLatestReceipt() {

        ReceiptOne receipt = receiptService.getLatestReceipt();

        Map<String, Object> response = new HashMap<>();

        response.put("contno", receipt.getContno());
        response.put("recNo", receipt.getRecNo());
        response.put("dvnoRefno", receipt.getDvnoRefno());
        response.put("chequeReceiptNo", receipt.getChequeReceiptNo());
        response.put("chequeReceiptDate", receipt.getChequeReceiptDate());
        response.put("amount", receipt.getAmount());
        response.put("bankCreditDate", receipt.getBankCreditDate());

        return response;
    }

    // ✅ Bills page → only latest record using MAX(contno)
    @GetMapping("/bill/latest")
    public ReceiptBillDto getLatestBillData() {
        return receiptService.getLatestBillReceipt();
    }
}