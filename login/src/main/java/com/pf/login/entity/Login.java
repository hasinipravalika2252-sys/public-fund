package com.pf.login.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "PF_LOGIN")
public class Login {

    @Id
    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PASSWORD1")
    private String password;

    @Column(name = "ROLE")
    private String role;

    // getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
