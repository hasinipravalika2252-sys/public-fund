package com.pf.login.controller;

import com.pf.login.service.PurposeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purpose")
@CrossOrigin(origins = "http://localhost:3000")
public class PurposeController {

    private final PurposeService purposeService;

    public PurposeController(PurposeService purposeService) {
        this.purposeService = purposeService;
    }

    // Get all types
    @GetMapping("/types")
    public List<String> getAllTypes() {
        return purposeService.getAllTypes();
    }

    // Get purposes by type
    @GetMapping("/by-type/{type}")
    public List<String> getPurposesByType(@PathVariable String type) {
        return purposeService.getPurposesByType(type);
    }
}
