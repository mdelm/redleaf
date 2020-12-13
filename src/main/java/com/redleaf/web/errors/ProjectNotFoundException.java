package com.redleaf.web.errors;

public class ProjectNotFoundException extends RuntimeException {

    public ProjectNotFoundException() {
    }

    public ProjectNotFoundException(String message) {
        super(message);
    }

}
