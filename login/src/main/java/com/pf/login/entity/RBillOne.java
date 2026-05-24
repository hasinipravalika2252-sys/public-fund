package com.pf.login.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "R_BILL_ONE")
public class RBillOne {

    @Id
    @Column(name = "RVNO")
    private Long rvno;   // ✅ CHANGED String → Long

    @Column(name = "CONTNO")
    private Long contno;

    @Column(name = "BILLNO")
    private String billNo;

    @Column(name = "BILLDATE")
    private LocalDate billDate;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "PURPOSE")
    private String purpose;

    @Column(name = "BILLAMOUNT")
    private BigDecimal billAmount;

    @Column(name = "BALANCE")
    private BigDecimal balance;

    @Column(name = "ALERTFLAG")
    private String alertFlag;

    // ===== GETTERS AND SETTERS =====

    public Long getRvno() {     // ✅ CHANGED
        return rvno;
    }

    public void setRvno(Long rvno) {   // ✅ CHANGED
        this.rvno = rvno;
    }

    public Long getContno() {
        return contno;
    }

    public void setContno(Long contno) {
        this.contno = contno;
    }

    public String getBillNo() {
        return billNo;
    }

    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public LocalDate getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public BigDecimal getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(BigDecimal billAmount) {
        this.billAmount = billAmount;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public String getAlertFlag() {
        return alertFlag;
    }

    public void setAlertFlag(String alertFlag) {
        this.alertFlag = alertFlag;
    }
}
