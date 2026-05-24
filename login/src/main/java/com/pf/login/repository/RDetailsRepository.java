package com.pf.login.repository;

import com.pf.login.entity.RDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RDetailsRepository extends JpaRepository<RDetails, Long> {

    @Query("SELECT COALESCE(SUM(r.amount),0) FROM RDetails r WHERE r.rvno = :rvno")
    Double getTotalAmountByRvno(@Param("rvno") Long rvno);

    @Query("SELECT COALESCE(MAX(r.sno),0)+1 FROM RDetails r WHERE r.rvno = :rvno")
    Long getNextSno(@Param("rvno") Long rvno);
}