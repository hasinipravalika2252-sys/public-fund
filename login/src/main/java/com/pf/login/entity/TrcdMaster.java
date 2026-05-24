package com.pf.login.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TRCD")
public class TrcdMaster {

    @Id
    @Column(name = "TRCD")
    private String trcd;

    @Column(name = "DESCRIPTION")
    private String description;

    public TrcdMaster() {
    }

    public String getTrcd() {
        return trcd;
    }

    public void setTrcd(String trcd) {
        this.trcd = trcd;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}