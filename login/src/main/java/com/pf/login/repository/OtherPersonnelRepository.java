package com.pf.login.repository;

import com.pf.login.entity.OtherPersonnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtherPersonnelRepository extends JpaRepository<OtherPersonnel, Long> {

}