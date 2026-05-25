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

        // 3️⃣ Duplicate check (Bill No + Bill Date)
        boolean exists = billRepository.existsByBillNoAndBillDate(
                billRequest.getBillNo(),
                billRequest.getBillDate()
        );

        if (exists) {
            throw new RuntimeException("Bill No + Bill Date combination should not repeat");
        }

        // 4️⃣ Validate amount
        BigDecimal newTotal = existingTotal.add(billRequest.getBillAmount());

        if (newTotal.compareTo(receiptAmount) > 0) {
            throw new RuntimeException("TOTAL AMOUNT EXCEEDS BILL AMOUNT");
        }

        // 5️⃣ Generate RVNO
        String rvPrefix = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMM"));

        Long rvStart = Long.parseLong(rvPrefix + "0000");
        Long rvEnd   = Long.parseLong(rvPrefix + "9999");

        Long maxRvno = billRepository.findMaxRvnoInRange(rvStart, rvEnd);

        Long newRvno;

        if (maxRvno == null) {
            newRvno = Long.parseLong(rvPrefix + "0001");
        } else {
            newRvno = maxRvno + 1;
        }

        // 6️⃣ Generate CONTNO
        String contPrefix = String.valueOf(LocalDate.now().getYear());

        Long contStart = Long.parseLong(contPrefix + "00000");
        Long contEnd   = Long.parseLong(contPrefix + "99999");

        Long maxContno = billRepository.findMaxContnoInRange(contStart, contEnd);

        Long newContno;

        if (maxContno == null) {
            newContno = Long.parseLong(contPrefix + "00001");
        } else {
            newContno = maxContno + 1;
        }

        // 7️⃣ Set values
        billRequest.setContno(newContno);

        billRequest.setRvno(newRvno);

        billRequest.setType("MIS");

        billRequest.setBalance(billRequest.getBillAmount());

        billRequest.setAlertFlag("N");

        if (billRequest.getBillDate() == null) {
            billRequest.setBillDate(LocalDate.now());
        }

        // 8️⃣ Save
        billRepository.save(billRequest);

        return newRvno;
    }

    // 🔹 Fetch latest bill using MAX(RVNO)
    public RBillOne getLatestBill() {
        return billRepository.findLatestBill();
    }
}