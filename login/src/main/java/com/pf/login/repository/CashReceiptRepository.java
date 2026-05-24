package com.pf.login.repository;

import com.pf.login.entity.CashReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CashReceiptRepository extends JpaRepository<CashReceipt, String> {

    @Query(value =
            "SELECT MAX(CONTNO) FROM RECEIPTS_ONE " +
            "WHERE TO_CHAR(TR_DATE,'YYYY') = TO_CHAR(SYSDATE,'YYYY')",
            nativeQuery = true)
    Long getMaxContNo();

    @Query(value =
            "SELECT MAX(RVNO) FROM RECEIPTS_ONE " +
            "WHERE TO_CHAR(TR_DATE,'YYYYMM') = TO_CHAR(SYSDATE,'YYYYMM')",
            nativeQuery = true)
    Long getMaxRvNo();

    @Query(value =
            "SELECT MAX(TO_NUMBER(REC_NO)) FROM RECEIPTS_ONE " +
            "WHERE SUBSTR(REC_NO,1,6) = TO_CHAR(SYSDATE,'YYYYMM')",
            nativeQuery = true)
    Long getMaxRecNo();
}