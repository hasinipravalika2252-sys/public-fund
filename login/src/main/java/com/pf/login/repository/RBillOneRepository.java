package com.pf.login.repository;

import com.pf.login.entity.RBillOne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface RBillOneRepository extends JpaRepository<RBillOne, Long> {  // ✅ CHANGED String → Long

    // 1️⃣ Get total bill amount for a receipt
    @Query("SELECT COALESCE(SUM(r.billAmount), 0) FROM RBillOne r WHERE r.contno = :contno")
    BigDecimal getTotalBillAmount(@Param("contno") Long contno);


    // 2️⃣ Get max RVNO in monthly range
    @Query("""
        SELECT MAX(r.rvno)
        FROM RBillOne r
        WHERE r.rvno BETWEEN :start AND :end
    """)
    Long findMaxRvnoInRange(@Param("start") Long start,
                            @Param("end") Long end);


    // 3️⃣ Fetch latest bill record using MAX(RVNO)
    @Query("SELECT r FROM RBillOne r WHERE r.rvno = (SELECT MAX(r2.rvno) FROM RBillOne r2)")
    RBillOne findLatestBill();
    @Query("""
    SELECT COUNT(r)
    FROM RBillOne r
    WHERE r.contno = :contno
    AND r.billNo = :billNo
    AND r.billDate = :billDate
""")
Long checkDuplicateBill(@Param("contno") Long contno,
                        @Param("billNo") String billNo,
                        @Param("billDate") java.time.LocalDate billDate);
}