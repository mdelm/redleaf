package com.redleaf.web.rest.errors;

public class ExpiredJwtException extends RuntimeException {

    public ExpiredJwtException() {
    }

    public ExpiredJwtException(String message) {
        super(message);
    }

}
