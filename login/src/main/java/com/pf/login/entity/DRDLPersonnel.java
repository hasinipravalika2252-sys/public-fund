package com.pf.login.entity;

import jakarta.persistence.*;

@Entity
@Table(name="DRDL_PERSONNEL")
public class DRDLPersonnel {

    @Id
    @Column(name="PERSNO")
    private Long persno;

    @Column(name="NAME")
    private String name;

    @Column(name="IDNO")
    private Long idno;

    public Long getPersno() {
        return persno;
    }

    public void setPersno(Long persno) {
        this.persno = persno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getIdno() {
        return idno;
    }

    public void setIdno(Long idno) {
        this.idno = idno;
    }
}