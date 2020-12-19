package com.redleaf.web.rest.errors;

import com.redleaf.web.rest.errors.NotFoundException;

public class TaskNotFoundException extends NotFoundException {

    public TaskNotFoundException() {
    }

    public TaskNotFoundException(String message) {
        super(message);
    }

}
