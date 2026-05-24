package com.pf.login.dto;

import java.math.BigDecimal;

public class CashReceiptDto {

    private String referenceNo;
    private Long receiptNo;
    private BigDecimal amount;
    private String remarks;
    private String chequeReceiptDate;
    private String purpose;
    private String fromAddress;
    private String trDate;
    private String bankCreditDate;

    public CashReceiptDto() {
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    public Long getReceiptNo() {
        return receiptNo;
    }

    public void setReceiptNo(Long receiptNo) {
        this.receiptNo = receiptNo;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getChequeReceiptDate() {
        return chequeReceiptDate;
    }

    public void setChequeReceiptDate(String chequeReceiptDate) {
        this.chequeReceiptDate = chequeReceiptDate;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getFromAddress() {
        return fromAddress;
    }

    public void setFromAddress(String fromAddress) {
        this.fromAddress = fromAddress;
    }

    public String getTrDate() {
        return trDate;
    }

    public void setTrDate(String trDate) {
        this.trDate = trDate;
    }

    public String getBankCreditDate() {
        return bankCreditDate;
    }

    public void setBankCreditDate(String bankCreditDate) {
        this.bankCreditDate = bankCreditDate;
    }
}