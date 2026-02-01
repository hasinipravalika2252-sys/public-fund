package com.pf.login.controller;

import com.pf.login.entity.Login;
import com.pf.login.service.LoginService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public String login(@RequestBody Login login) {
        return loginService.authenticate(
                login.getUsername(),
                login.getPassword(),
                login.getRole()
        );
    }
}
