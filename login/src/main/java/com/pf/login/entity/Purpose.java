package com.pf.login.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "PURPOSE")
public class Purpose {

    @Id
    @Column(name = "SNO")
    private Long sno;

    @Column(name = "PURPOSE")
    private String purpose;

    @Column(name = "TYPE")
    private String type;

    // Getters & Setters

    public Long getSno() {
        return sno;
    }

    public void setSno(Long sno) {
        this.sno = sno;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
