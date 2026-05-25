package com.pf.login.repository;

import com.pf.login.entity.RBillOne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface RBillOneRepository extends JpaRepository<RBillOne, Long> {

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

    // 4️⃣ Duplicate Bill No + Bill Date check
    @Query("""
        SELECT COUNT(r) > 0
        FROM RBillOne r
        WHERE r.billNo = :billNo
        AND r.billDate = :billDate
    """)
    boolean existsByBillNoAndBillDate(@Param("billNo") String billNo,
                                      @Param("billDate") LocalDate billDate);

    // 5️⃣ Get max CONTNO in yearly range
    @Query("""
        SELECT MAX(r.contno)
        FROM RBillOne r
        WHERE r.contno BETWEEN :start AND :end
    """)
    Long findMaxContnoInRange(@Param("start") Long start,
                              @Param("end") Long end);

}