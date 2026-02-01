package com.pf.login.repository;

import com.pf.login.entity.ReceiptOne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReceiptRepository extends JpaRepository<ReceiptOne, Long> {

    // 🔹 CONTNO: Year-wise max
    @Query("""
        SELECT MAX(r.contno)
        FROM ReceiptOne r
        WHERE SUBSTR(TO_CHAR(r.contno),1,4) = :year
    """)
    Long findMaxContnoForYear(@Param("year") String year);

    // 🔹 REC_NO: Year + Month wise max
    @Query("""
        SELECT MAX(r.recNo)
        FROM ReceiptOne r
        WHERE SUBSTR(r.recNo,1,6) = :yearMonth
    """)
    String findMaxRecNoForMonth(@Param("yearMonth") String yearMonth);
}
