package com.pf.login.service;

import com.pf.login.entity.Login;
import com.pf.login.repository.LoginRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final LoginRepository loginRepository;

    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }
public String authenticate(String username, String password) {

    Optional<Login> userOpt = loginRepository.findByUsername(username);

    boolean usernameOk = false;
    boolean passwordOk = false;
   

    if (userOpt.isPresent()) {
        usernameOk = true;

        Login user = userOpt.get();
        passwordOk = user.getPassword().equals(password);
        
    }

    // ✅ All correct
    if (usernameOk && passwordOk ) {
        return "Login successful";
    }

    // ❌ Build error message for ALL wrong fields
    StringBuilder error = new StringBuilder("Please enter correct ");

    if (!usernameOk) {
        error.append("username, ");
    }
    if (!passwordOk) {
        error.append("password, ");
    }
    

    // remove last comma and space
    error.setLength(error.length() - 2);

    return error.toString();
}


}
