package com.redleaf.web.errors;

public class ProjectNotFoundException extends NotFoundException {

    public ProjectNotFoundException() {
    }

    public ProjectNotFoundException(String message) {
        super(message);
    }

}
