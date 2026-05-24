package com.pf.login.repository;

import com.pf.login.entity.TrcdMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrcdMasterRepository extends JpaRepository<TrcdMaster, String> {
}