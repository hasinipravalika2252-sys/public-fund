package com.pf.login.service;

import com.pf.login.dto.CashReceiptDto;
import com.pf.login.entity.CashReceipt;
import com.pf.login.entity.TrcdMaster;
import com.pf.login.repository.CashReceiptRepository;
import com.pf.login.repository.TrcdMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class CashReceiptService {

    @Autowired
    private CashReceiptRepository cashReceiptRepository;

    @Autowired
    private TrcdMasterRepository trcdMasterRepository;

    public String saveCashReceipt(CashReceiptDto dto) {

        try {

            CashReceipt cashReceipt = new CashReceipt();

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

           Date trDate = null;
Date chequeReceiptDate = null;
Date bankCreditDate = null;

if (dto.getTrDate() != null && !dto.getTrDate().isEmpty()) {
    trDate = formatter.parse(dto.getTrDate());
}

if (dto.getChequeReceiptDate() != null && !dto.getChequeReceiptDate().isEmpty()) {
    chequeReceiptDate = formatter.parse(dto.getChequeReceiptDate());
}

if (dto.getBankCreditDate() != null && !dto.getBankCreditDate().isEmpty()) {
    bankCreditDate = formatter.parse(dto.getBankCreditDate());
}

            Long contNo = generateContNo();
            Long rvNo = generateRvNo();
            String recNo = generateRecNo();

            TrcdMaster trcdMaster = trcdMasterRepository
                    .findById("R3")
                    .orElse(null);

            String trcdDescription = "";

            if (trcdMaster != null) {
                trcdDescription = trcdMaster.getDescription();
            }

            cashReceipt.setContNo(contNo);
            cashReceipt.setDvnoRefNo(dto.getReferenceNo());
            cashReceipt.setRvNo(rvNo);
            cashReceipt.setRecNo(recNo);

            cashReceipt.setChequeReceiptNo(dto.getReceiptNo());
            cashReceipt.setAmount(dto.getAmount());

            cashReceipt.setTrcd("R3");
            cashReceipt.setTrcdDesc(trcdDescription);

            cashReceipt.setRemarks(dto.getRemarks());

            cashReceipt.setBalance(dto.getAmount());

            cashReceipt.setTrDate(trDate);

            cashReceipt.setChequeReceiptDate(chequeReceiptDate);

            cashReceipt.setRPurpose(dto.getPurpose());

            cashReceipt.setChequeCash("CH");

            cashReceipt.setFromAddress(dto.getFromAddress());

            cashReceipt.setRType("MIS");

            cashReceipt.setAlertFlag("N");

            cashReceipt.setBankCreditDate(bankCreditDate);

            cashReceiptRepository.save(cashReceipt);

            return "Cash Receipt Saved Successfully";

        } catch (Exception e) {

            e.printStackTrace();

            return "Error While Saving Cash Receipt";
        }
    }

   private Long generateContNo() {

    String currentYear =
            new SimpleDateFormat("yyyy").format(new Date());

    Long maxContNo =
            cashReceiptRepository.getMaxContNo();

    if (maxContNo == null) {

        return Long.parseLong(currentYear + "00001");
    }

    String maxValue = String.valueOf(maxContNo);

    if (!maxValue.startsWith(currentYear)) {

        return Long.parseLong(currentYear + "00001");
    }

    Long sequence =
            Long.parseLong(maxValue.substring(4));

    sequence++;

    return Long.parseLong(
            currentYear + String.format("%05d", sequence)
    );
}

    private Long generateRvNo() {

    String yearMonth =
            new SimpleDateFormat("yyyyMM").format(new Date());

    Long maxRvNo =
            cashReceiptRepository.getMaxRvNo();

    if (maxRvNo == null) {

        return Long.parseLong(yearMonth + "0001");
    }

    String maxValue = String.valueOf(maxRvNo);

    if (!maxValue.startsWith(yearMonth)) {

        return Long.parseLong(yearMonth + "0001");
    }

    Long sequence =
            Long.parseLong(maxValue.substring(6));

    sequence++;

    return Long.parseLong(
            yearMonth + String.format("%04d", sequence)
    );
}

    private String generateRecNo() {

    String yearMonth =
            new SimpleDateFormat("yyyyMM").format(new Date());

    Long maxRecNo =
            cashReceiptRepository.getMaxRecNo();

    if (maxRecNo == null) {

        return yearMonth + "0001";
    }

    String maxValue = String.valueOf(maxRecNo);

    if (!maxValue.startsWith(yearMonth)) {

        return yearMonth + "0001";
    }

    Long sequence =
            Long.parseLong(maxValue.substring(6));

    sequence++;

    return yearMonth + String.format("%04d", sequence);
}
}