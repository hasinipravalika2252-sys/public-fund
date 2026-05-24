package com.pf.login.controller;

import com.pf.login.entity.RDetails;
import com.pf.login.service.RDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rdetails")
@CrossOrigin
public class RDetailsController {

    @Autowired
    private RDetailsService service;

    @PostMapping("/save")
    public String saveDetails(@RequestBody RDetails request,
                              @RequestParam Double billAmount) {

        return service.saveDetails(request, billAmount);
    }
}