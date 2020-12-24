package com.redleaf.web.rest.io;

import java.util.HashMap;
import java.util.Map;

public class ValidationExceptionResponse extends ExceptionResponse {
    
    protected Map<String, String> errors = new HashMap<>();

    public ValidationExceptionResponse() {
    }

    public ValidationExceptionResponse(Map<String, String> errors, int status, String message, long timestamp, String details) {
        super(status, message, timestamp, details);
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
    
    public void addError(String fieldName, String message) {
        this.errors.put(fieldName, message);
    }
}
