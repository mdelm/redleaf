package com.redleaf.web.rest.errors;

import com.redleaf.web.rest.errors.NotFoundException;

public class ProjectNotFoundException extends NotFoundException {

    public ProjectNotFoundException() {
    }

    public ProjectNotFoundException(String message) {
        super(message);
    }

}
