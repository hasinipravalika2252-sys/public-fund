package com.pf.login.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ReceiptBillDto {

    private String recNo;
    private String dvnoRefno;
    private Long chequeReceiptNo;
    private LocalDate chequeReceiptDate;
    private BigDecimal amount;
    private LocalDate bankCreditDate;

    public ReceiptBillDto(String recNo,
                          String dvnoRefno,
                          Long chequeReceiptNo,
                          LocalDate chequeReceiptDate,
                          BigDecimal amount,
                          LocalDate bankCreditDate) {
        this.recNo = recNo;
        this.dvnoRefno = dvnoRefno;
        this.chequeReceiptNo = chequeReceiptNo;
        this.chequeReceiptDate = chequeReceiptDate;
        this.amount = amount;
        this.bankCreditDate = bankCreditDate;
    }

    public String getRecNo() { return recNo; }
    public String getDvnoRefno() { return dvnoRefno; }
    public Long getChequeReceiptNo() { return chequeReceiptNo; }
    public LocalDate getChequeReceiptDate() { return chequeReceiptDate; }
    public BigDecimal getAmount() { return amount; }
    public LocalDate getBankCreditDate() { return bankCreditDate; }
}
