package com.pf.login.repository;

import com.pf.login.entity.DRDLPersonnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DRDLPersonnelRepository extends JpaRepository<DRDLPersonnel, Long> {

}