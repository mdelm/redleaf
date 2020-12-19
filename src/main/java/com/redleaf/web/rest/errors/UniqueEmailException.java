package com.redleaf.web.rest.errors;

public class UniqueEmailException extends RuntimeException {

    public UniqueEmailException() {
    }

    public UniqueEmailException(String message) {
        super(message);
    }

}
