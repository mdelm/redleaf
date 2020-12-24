package com.redleaf.web.rest.errors;

import java.util.Map;
import org.springframework.validation.BindingResult;

public class ExpiredJwtException extends ValidationException {

    public ExpiredJwtException() {
    }

    public ExpiredJwtException(String key, String value) {
        super(key, value);
    }

    public ExpiredJwtException(BindingResult result) {
        super(result);
    }

    public ExpiredJwtException(Map<String, String> errors) {
        super(errors);
    }

}
