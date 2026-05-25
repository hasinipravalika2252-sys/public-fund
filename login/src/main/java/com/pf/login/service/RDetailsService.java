package com.pf.login.service;

import com.pf.login.entity.RDetails;
import com.pf.login.repository.RDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RDetailsService {

    @Autowired
    private RDetailsRepository repository;

    public String saveDetails(RDetails request, Double billAmount) {

        Double currentTotal = repository.getTotalAmountByRvno(request.getRvno());

        if (currentTotal == null) {
            currentTotal = 0.0;
        }

        Double amount = request.getAmount();

        int taxFlag = request.getTaxflag();

        // -------------------------
        // CASE 1 : TAX = NIL
        // -------------------------
        if (taxFlag == 0) {

            Double newTotal = currentTotal + amount;

            if (newTotal > billAmount) {
                return "Specified person transaction failed because total amount exceed Bill Amount";
            }

            Long sno = repository.getNextSno(request.getRvno());

            request.setSno(sno);
            request.setBalance(amount);

            repository.save(request);

            if (newTotal.equals(billAmount)) {
                return "All payment details for RVNO " + request.getRvno() + " inserted successfully";
            }

            return "Saved Successfully";
        }

        // -------------------------
        // CASE 2 : TAX = 2 OR 10
        // -------------------------

        double tdsAmount = (amount * taxFlag) / 100;
        double netAmount = amount - tdsAmount;

        Double newTotal = currentTotal + amount;

        if (newTotal > billAmount) {
            return "Specified person transaction failed because total amount exceed Bill Amount";
        }

        // ---- First Record (Net Amount)

        Long sno1 = repository.getNextSno(request.getRvno());

        RDetails record1 = new RDetails();
        record1.setSno(sno1);
        record1.setRvno(request.getRvno());
        record1.setPersno(request.getPersno());
        record1.setAmount(netAmount);
        record1.setCashbookAmount(request.getCashbookAmount());
        record1.setBalance(netAmount);
        record1.setTaxflag(taxFlag);
        record1.setAlertflag(request.getAlertflag());

        repository.save(record1);

        // ---- Second Record (TDS)

        Long sno2 = sno1 + 1;

        RDetails record2 = new RDetails();
        record2.setSno(sno2);
        record2.setRvno(request.getRvno());
        record2.setPersno(request.getPersno() + "T");
        record2.setAmount(tdsAmount);
        record2.setCashbookAmount(request.getCashbookAmount());
        record2.setBalance(tdsAmount);
        record2.setTaxflag(taxFlag);
        record2.setAlertflag(request.getAlertflag());

        repository.save(record2);

        if (newTotal.equals(billAmount)) {
            return "All payment details for RVNO " + request.getRvno() + " inserted successfully";
        }

        return "Saved Successfully";
    }
}