package com.redleaf.web.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    
    @ExceptionHandler
    public final ResponseEntity<ExceptionResponse> handleProjectNotFoundException(ProjectNotFoundException exc, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse();
        
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setMessage(exc.getMessage());
        response.setDetails(request.getDescription(false));
        response.setTimestamp(System.currentTimeMillis());
        
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler
    public final ResponseEntity<ValidationExceptionResponse> handleProjectIdentifierException(ProjectIdentifierException exc, WebRequest request) {
        ValidationExceptionResponse response = new ValidationExceptionResponse();
        
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(exc.getMessage());
        response.setDetails(request.getDescription(false));
        response.setTimestamp(System.currentTimeMillis());
        response.addError("projectIdentifier", exc.getMessage());
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler
    public final ResponseEntity<ValidationExceptionResponse> handleValidationException(ValidationException exc, WebRequest request) {
        ValidationExceptionResponse response = new ValidationExceptionResponse();
        
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(exc.getMessage());
        response.setDetails(request.getDescription(false));
        response.setTimestamp(System.currentTimeMillis());
        response.setErrors(exc.getErrors());
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
