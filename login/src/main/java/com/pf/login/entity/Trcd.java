package com.pf.login.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TRCD")
public class Trcd {

    @Id
    @Column(name = "TRCD")   // ✅ FIX: use REAL column name
    private String trcd;

    @Column(name = "DESCRIPTION")
    private String trcdDesc;

    // getters & setters

    public String getTrcd() {
        return trcd;
    }

    public void setTrcd(String trcd) {
        this.trcd = trcd;
    }

    public String getTrcdDesc() {
        return trcdDesc;
    }

    public void setTrcdDesc(String trcdDesc) {
        this.trcdDesc = trcdDesc;
    }
}
