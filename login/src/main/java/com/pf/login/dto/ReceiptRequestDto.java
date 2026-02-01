package com.pf.login.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;

public class ReceiptRequestDto {

    // from CDA DVNO (frontend)
    private String dvno;

    // CDA cheque number
    private Long chequeNo;

    // cheque slip total amount
    private BigDecimal amount;

    // CDA cheque date
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate chequeDate;

    // optional bank credit date
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bankCreditDate;

    // login page date (TR_DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate loginDate;

    // -------- GETTERS & SETTERS --------

    public String getDvno() {
        return dvno;
    }

    public void setDvno(String dvno) {
        this.dvno = dvno;
    }

    public Long getChequeNo() {
        return chequeNo;
    }

    public void setChequeNo(Long chequeNo) {
        this.chequeNo = chequeNo;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getChequeDate() {
        return chequeDate;
    }

    public void setChequeDate(LocalDate chequeDate) {
        this.chequeDate = chequeDate;
    }

    public LocalDate getBankCreditDate() {
        return bankCreditDate;
    }

    public void setBankCreditDate(LocalDate bankCreditDate) {
        this.bankCreditDate = bankCreditDate;
    }

    public LocalDate getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(LocalDate loginDate) {
        this.loginDate = loginDate;
    }
}
