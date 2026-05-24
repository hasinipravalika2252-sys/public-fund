package com.pf.login.service;

import com.pf.login.entity.Purpose;
import com.pf.login.repository.PurposeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurposeService {

    private final PurposeRepository purposeRepository;

    public PurposeService(PurposeRepository purposeRepository) {
        this.purposeRepository = purposeRepository;
    }

    // Get all distinct types
    public List<String> getAllTypes() {
        return purposeRepository.findAllTypes();
    }

    // Get purposes by type
    public List<String> getPurposesByType(String type) {
      return purposeRepository.findByTypeIgnoreCase(type)

                .stream()
                .map(Purpose::getPurpose)
                .collect(Collectors.toList());
    }
}
