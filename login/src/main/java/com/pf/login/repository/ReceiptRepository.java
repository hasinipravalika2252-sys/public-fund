package com.pf.login.repository;

import com.pf.login.entity.ReceiptOne;
import com.pf.login.dto.ReceiptBillDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;   // ✅ ADD THIS

public interface ReceiptRepository extends JpaRepository<ReceiptOne, Long> {

    @Query("""
        SELECT MAX(r.contno)
        FROM ReceiptOne r
        WHERE SUBSTR(TO_CHAR(r.contno),1,4) = :year
    """)
    Long findMaxContnoForYear(@Param("year") String year);


    @Query("""
        SELECT MAX(r.recNo)
        FROM ReceiptOne r
        WHERE SUBSTR(r.recNo,1,6) = :yearMonth
    """)
    String findMaxRecNoForMonth(@Param("yearMonth") String yearMonth);


    @Query("""
        SELECT r FROM ReceiptOne r
        WHERE r.contno = (
            SELECT MAX(r2.contno) FROM ReceiptOne r2
        )
    """)
    ReceiptOne findLatestReceipt();


    @Query("""
        SELECT new com.pf.login.dto.ReceiptBillDto(
            r.recNo,
            r.dvnoRefno,
            r.chequeReceiptNo,
            r.chequeReceiptDate,
            r.amount,
            r.bankCreditDate
        )
        FROM ReceiptOne r
        WHERE r.contno = (
            SELECT MAX(r2.contno) FROM ReceiptOne r2
        )
    """)
    ReceiptBillDto findLatestBillReceipt();


    // 🔥🔥🔥 ADD THIS METHOD (VERY IMPORTANT)
    Optional<ReceiptOne> findByContno(Long contno);

}
