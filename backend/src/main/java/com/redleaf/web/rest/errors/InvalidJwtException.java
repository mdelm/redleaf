package com.redleaf.web.rest.errors;

import java.util.Map;
import org.springframework.validation.BindingResult;

public class InvalidJwtException extends ValidationException {

    public InvalidJwtException() {
    }

    public InvalidJwtException(String key, String value) {
        super(key, value);
    }

    public InvalidJwtException(BindingResult result) {
        super(result);
    }

    public InvalidJwtException(Map<String, String> errors) {
        super(errors);
    }

}
