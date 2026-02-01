package com.pf.login.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "RECEIPTS_ONE")
public class ReceiptOne {

    @Id
    @Column(name = "CONTNO")
    private Long contno;

    @Column(name = "DVNO_REFNO")
    private String dvnoRefno;

    @Column(name = "RVNO")
    private Long rvno;

    @Column(name = "CHEQUE_RECEIPT_NO")
    private Long chequeReceiptNo;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    @Column(name = "TRCD")
    private String trcd;

    @Column(name = "TRCD_DESC")
    private String trcdDesc;

    @Column(name = "REMARKS")
    private String remarks;

    @Column(name = "BALANCE")
    private BigDecimal balance;

    @Column(name = "TR_DATE")
    private LocalDate trDate;

    @Column(name = "CHEQUE_RECEIPT_DATE")
    private LocalDate chequeReceiptDate;

    @Column(name = "R_PURPOSE")
    private String rPurpose;

    @Column(name = "CHEQUE_CASH")
    private String chequeCash;

    @Column(name = "FROM_ADDRESS")
    private String fromAddress;

    @Column(name = "R_TYPE")
    private String rType;

    @Column(name = "ALERTFLAG")
    private String alertFlag;

    @Column(name = "REC_NO")
    private String recNo;

    @Column(name = "BANK_CREDIT_DATE")
    private LocalDate bankCreditDate;

    // -------- GETTERS & SETTERS --------

    public Long getContno() {
        return contno;
    }

    public void setContno(Long contno) {
        this.contno = contno;
    }

    public String getDvnoRefno() {
        return dvnoRefno;
    }

    public void setDvnoRefno(String dvnoRefno) {
        this.dvnoRefno = dvnoRefno;
    }

    public Long getRvno() {
        return rvno;
    }

    public void setRvno(Long rvno) {
        this.rvno = rvno;
    }

    public Long getChequeReceiptNo() {
        return chequeReceiptNo;
    }

    public void setChequeReceiptNo(Long chequeReceiptNo) {
        this.chequeReceiptNo = chequeReceiptNo;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getTrcd() {
        return trcd;
    }

    public void setTrcd(String trcd) {
        this.trcd = trcd;
    }

    public String getTrcdDesc() {
        return trcdDesc;
    }

    public void setTrcdDesc(String trcdDesc) {
        this.trcdDesc = trcdDesc;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public LocalDate getTrDate() {
        return trDate;
    }

    public void setTrDate(LocalDate trDate) {
        this.trDate = trDate;
    }

    public LocalDate getChequeReceiptDate() {
        return chequeReceiptDate;
    }

    public void setChequeReceiptDate(LocalDate chequeReceiptDate) {
        this.chequeReceiptDate = chequeReceiptDate;
    }

    public String getRPurpose() {
        return rPurpose;
    }

    public void setRPurpose(String rPurpose) {
        this.rPurpose = rPurpose;
    }

    public String getChequeCash() {
        return chequeCash;
    }

    public void setChequeCash(String chequeCash) {
        this.chequeCash = chequeCash;
    }

    public String getFromAddress() {
        return fromAddress;
    }

    public void setFromAddress(String fromAddress) {
        this.fromAddress = fromAddress;
    }

    public String getRType() {
        return rType;
    }

    public void setRType(String rType) {
        this.rType = rType;
    }

    public String getAlertFlag() {
        return alertFlag;
    }

    public void setAlertFlag(String alertFlag) {
        this.alertFlag = alertFlag;
    }

    public String getRecNo() {
        return recNo;
    }

    public void setRecNo(String recNo) {
        this.recNo = recNo;
    }

    public LocalDate getBankCreditDate() {
        return bankCreditDate;
    }

    public void setBankCreditDate(LocalDate bankCreditDate) {
        this.bankCreditDate = bankCreditDate;
    }
}
