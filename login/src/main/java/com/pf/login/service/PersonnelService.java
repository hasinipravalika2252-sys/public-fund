package com.pf.login.service;

import com.pf.login.entity.DRDLPersonnel;
import com.pf.login.entity.OtherPersonnel;
import com.pf.login.repository.DRDLPersonnelRepository;
import com.pf.login.repository.OtherPersonnelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonnelService {

    @Autowired
    private DRDLPersonnelRepository drdlRepo;

    @Autowired
    private OtherPersonnelRepository otherRepo;

    public List<DRDLPersonnel> getDRDLPersonnel() {
        return drdlRepo.findAll();
    }

    public List<OtherPersonnel> getOtherPersonnel() {
        return otherRepo.findAll();
    }
}