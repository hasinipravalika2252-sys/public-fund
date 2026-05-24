package com.pf.login.service;

import com.pf.login.entity.RBillOne;
import com.pf.login.entity.ReceiptOne;
import com.pf.login.repository.RBillOneRepository;
import com.pf.login.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class BillService {

    @Autowired
    private RBillOneRepository billRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

    public Long saveBill(RBillOne billRequest) {

        // 1️⃣ Get latest receipt (MAX CONTNO)
        ReceiptOne receipt = receiptRepository.findLatestReceipt();

        if (receipt == null) {
            throw new RuntimeException("No receipt found in RECEIPTS_ONE table");
        }

        Long latestContno = receipt.getContno();
        BigDecimal receiptAmount = receipt.getAmount();

        // 2️⃣ Get total bill amount already used
        BigDecimal existingTotal = billRepository.getTotalBillAmount(latestContno);

        if (existingTotal == null) {
            existingTotal = BigDecimal.ZERO;
        }

        // 3️⃣ Validate
        BigDecimal newTotal = existingTotal.add(billRequest.getBillAmount());

        if (newTotal.compareTo(receiptAmount) > 0) {
            throw new RuntimeException("TOTAL AMOUNT EXCEEDS BILL AMOUNT");
        }

        // 4️⃣ Generate RVNO
        String prefix = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMM"));

        Long start = Long.parseLong(prefix + "0000");
        Long end   = Long.parseLong(prefix + "9999");

        Long maxRvno = billRepository.findMaxRvnoInRange(start, end);

        Long newRvno;

        if (maxRvno == null) {
            newRvno = Long.parseLong(prefix + "0001");
        } else {
            newRvno = maxRvno + 1;
        }
        // DUPLICATE CHECK
Long duplicateCount = billRepository.checkDuplicateBill(
        latestContno,
        billRequest.getBillNo(),
        billRequest.getBillDate()
);

if (duplicateCount > 0) {
    throw new RuntimeException(
            "SAME CONTNO + BILL NO + BILL DATE ALREADY EXISTS");
}

        // 5️⃣ Set values
        billRequest.setContno(latestContno);
        billRequest.setRvno(newRvno);
        billRequest.setBalance(billRequest.getBillAmount());
        billRequest.setAlertFlag("N");

        // 6️⃣ Save
        billRepository.save(billRequest);

        return newRvno;
    }


    // 🔹 NEW METHOD (added only for fetching latest bill)
    public RBillOne getLatestBill() {
        return billRepository.findLatestBill();
    }
}