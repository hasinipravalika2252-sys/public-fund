package com.pf.login.repository;

import com.pf.login.entity.Purpose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PurposeRepository extends JpaRepository<Purpose, Long> {

    @Query("SELECT DISTINCT p.type FROM Purpose p")
    List<String> findAllTypes();

    @Query("SELECT p FROM Purpose p WHERE UPPER(p.type) = UPPER(:type)")
    List<Purpose> findByTypeIgnoreCase(@Param("type") String type);
}
