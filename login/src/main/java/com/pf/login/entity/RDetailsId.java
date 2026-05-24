package com.pf.login.entity;

import java.io.Serializable;
import java.util.Objects;

public class RDetailsId implements Serializable {

    private Long rvno;
    private Long sno;

    public RDetailsId() {}

    public RDetailsId(Long rvno, Long sno) {
        this.rvno = rvno;
        this.sno = sno;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RDetailsId)) return false;
        RDetailsId that = (RDetailsId) o;
        return Objects.equals(rvno, that.rvno) &&
               Objects.equals(sno, that.sno);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rvno, sno);
    }
}