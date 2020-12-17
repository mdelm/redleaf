package com.redleaf.web.errors;

public class TaskNotFoundException extends NotFoundException {

    public TaskNotFoundException() {
    }

    public TaskNotFoundException(String message) {
        super(message);
    }

}
