package com.redleaf.web.rest.io;

import java.util.Map;

public class AuthenticationExceptionResponse extends ValidationExceptionResponse {

    public AuthenticationExceptionResponse() {
        this.errors.put("badCredentials", "Incorrect username or password");
    }

    public AuthenticationExceptionResponse(Map<String, String> errors, int status, String message, long timestamp, String details) {
        super(errors, status, message, timestamp, details);
        
        this.errors.put("badCredentials", "Incorrect username or password");
    }

}
