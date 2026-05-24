package com.pf.login.service;

import com.pf.login.dto.ReceiptRequestDto;
import com.pf.login.dto.ReceiptBillDto;
import com.pf.login.entity.ReceiptOne;
import com.pf.login.entity.Trcd;
import com.pf.login.repository.ReceiptRepository;
import com.pf.login.repository.TrcdRepository;

import org.springframework.stereotype.Service;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final TrcdRepository trcdRepository;

    public ReceiptService(ReceiptRepository receiptRepository,
                          TrcdRepository trcdRepository) {
        this.receiptRepository = receiptRepository;
        this.trcdRepository = trcdRepository;
    }

    public void saveCdaReceipt(ReceiptRequestDto dto) {

        ReceiptOne receipt = new ReceiptOne();

        String year = String.valueOf(dto.getLoginDate().getYear());

        Long maxContno = receiptRepository.findMaxContnoForYear(year);
        long nextContSeq = (maxContno == null) ? 1 : (maxContno % 100000) + 1;
        Long contno = Long.parseLong(year + String.format("%05d", nextContSeq));

        String yearMonth = year + String.format("%02d", dto.getLoginDate().getMonthValue());

        String maxRecNo = receiptRepository.findMaxRecNoForMonth(yearMonth);
        int nextRecSeq = (maxRecNo == null) ? 1 : Integer.parseInt(maxRecNo.substring(6)) + 1;
        String recNo = yearMonth + String.format("%04d", nextRecSeq);

        Trcd trcd = trcdRepository.findById("R1")
                .orElseThrow(() -> new RuntimeException("TRCD R1 not found"));

        receipt.setContno(contno);
        receipt.setRecNo(recNo);
        receipt.setDvnoRefno(dto.getDvno());
        receipt.setRvno(null);
        receipt.setChequeReceiptNo(dto.getChequeNo());
        receipt.setAmount(dto.getAmount());
        receipt.setBalance(dto.getAmount());
        receipt.setTrcd("R1");
        receipt.setTrcdDesc(trcd.getTrcdDesc());
        receipt.setTrDate(dto.getLoginDate());
        receipt.setChequeReceiptDate(dto.getChequeDate());
        receipt.setBankCreditDate(dto.getBankCreditDate());
        receipt.setRemarks(null);
        receipt.setRPurpose(null);
        receipt.setChequeCash(null);
        receipt.setFromAddress(null);
        receipt.setRType(null);
        receipt.setAlertFlag("N");

        receiptRepository.save(receipt);
    }

    // ✅ NEW METHOD FOR PCDA (ONLY TRCD CHANGE)
    public void savePcdaReceipt(ReceiptRequestDto dto) {

        ReceiptOne receipt = new ReceiptOne();

        String year = String.valueOf(dto.getLoginDate().getYear());

        Long maxContno = receiptRepository.findMaxContnoForYear(year);
        long nextContSeq = (maxContno == null) ? 1 : (maxContno % 100000) + 1;
        Long contno = Long.parseLong(year + String.format("%05d", nextContSeq));

        String yearMonth = year + String.format("%02d", dto.getLoginDate().getMonthValue());

        String maxRecNo = receiptRepository.findMaxRecNoForMonth(yearMonth);
        int nextRecSeq = (maxRecNo == null) ? 1 : Integer.parseInt(maxRecNo.substring(6)) + 1;
        String recNo = yearMonth + String.format("%04d", nextRecSeq);

        // ✅ ONLY CHANGE → TRCD = R2
        Trcd trcd = trcdRepository.findById("R2")
                .orElseThrow(() -> new RuntimeException("TRCD R2 not found"));

        receipt.setContno(contno);
        receipt.setRecNo(recNo);
        receipt.setDvnoRefno(dto.getDvno());
        receipt.setRvno(null);
        receipt.setChequeReceiptNo(dto.getChequeNo());
        receipt.setAmount(dto.getAmount());
        receipt.setBalance(dto.getAmount());
        receipt.setTrcd("R2");
        receipt.setTrcdDesc(trcd.getTrcdDesc());
        receipt.setTrDate(dto.getLoginDate());
        receipt.setChequeReceiptDate(dto.getChequeDate());
        receipt.setBankCreditDate(dto.getBankCreditDate());
        receipt.setRemarks(null);
        receipt.setRPurpose(null);
        receipt.setChequeCash(null);
        receipt.setFromAddress(null);
        receipt.setRType(null);
        receipt.setAlertFlag("N");

        receiptRepository.save(receipt);
    }

    public ReceiptOne getLatestReceipt() {
        return receiptRepository.findLatestReceipt();
    }

    // ✅ Correct method for Bills page
    public ReceiptBillDto getLatestBillReceipt() {
        return receiptRepository.findLatestBillReceipt();
    }
}