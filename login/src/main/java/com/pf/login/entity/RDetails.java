package com.pf.login.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "R_DETAILS")
@IdClass(RDetailsId.class)
public class RDetails {

    @Id
    @Column(name = "RVNO")
    private Long rvno;

    @Id
    @Column(name = "SNO")
    private Long sno;

    @Column(name = "PERSNO")
    private String persno;

    @Column(name = "AMOUNT")
    private Double amount;

    @Column(name = "CASHBOOK_AMOUNT")
    private Double cashbookAmount;

    @Column(name = "BALANCE")
    private Double balance;

    @Column(name = "TAXFLAG")
    private Integer taxflag;

    @Column(name = "ALERTFLAG")
    private String alertflag;

    public RDetails() {}

    public Long getRvno() {
        return rvno;
    }

    public void setRvno(Long rvno) {
        this.rvno = rvno;
    }

    public Long getSno() {
        return sno;
    }

    public void setSno(Long sno) {
        this.sno = sno;
    }

    public String getPersno() {
        return persno;
    }

    public void setPersno(String persno) {
        this.persno = persno;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getCashbookAmount() {
        return cashbookAmount;
    }

    public void setCashbookAmount(Double cashbookAmount) {
        this.cashbookAmount = cashbookAmount;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Integer getTaxflag() {
        return taxflag;
    }

    public void setTaxflag(Integer taxflag) {
        this.taxflag = taxflag;
    }

    public String getAlertflag() {
        return alertflag;
    }

    public void setAlertflag(String alertflag) {
        this.alertflag = alertflag;
    }
}