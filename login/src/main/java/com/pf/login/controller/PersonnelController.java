package com.pf.login.controller;

import com.pf.login.entity.DRDLPersonnel;
import com.pf.login.entity.OtherPersonnel;
import com.pf.login.repository.DRDLPersonnelRepository;
import com.pf.login.repository.OtherPersonnelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personnel")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonnelController {

    @Autowired
    private DRDLPersonnelRepository drdlRepo;

    @Autowired
    private OtherPersonnelRepository otherRepo;

    @GetMapping("/drdl")
    public List<DRDLPersonnel> getDRDLPersonnel() {
        return drdlRepo.findAll();
    }

    @GetMapping("/other")
    public List<OtherPersonnel> getOtherPersonnel() {
        return otherRepo.findAll();
    }
}