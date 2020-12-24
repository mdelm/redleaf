package com.redleaf.web.rest.errors;

import com.redleaf.web.rest.io.AuthenticationExceptionResponse;
import com.redleaf.web.rest.io.ExceptionResponse;
import com.redleaf.web.rest.io.ValidationExceptionResponse;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    
    @ExceptionHandler
    public final ResponseEntity<ExceptionResponse> handleNotFoundException(NotFoundException exc, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse();
        
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setMessage(exc.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        response.setDetails(request.getDescription(false));
        
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler
    public final ResponseEntity<AuthenticationExceptionResponse> handleInternalAuthenticationServiceException(InternalAuthenticationServiceException exc, WebRequest request) {
        AuthenticationExceptionResponse response = new AuthenticationExceptionResponse();
        
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(exc.getMessage());
        response.setDetails(request.getDescription(false));
        response.setTimestamp(System.currentTimeMillis());
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler
    public final ResponseEntity<AuthenticationExceptionResponse> handleAuthenticationException(AuthenticationException exc, WebRequest request) {
        AuthenticationExceptionResponse response = new AuthenticationExceptionResponse();
        
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(exc.getMessage());
        response.setDetails(request.getDescription(false));
        response.setTimestamp(System.currentTimeMillis());
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler
    public final ResponseEntity<ValidationExceptionResponse> handleProjectIdentifierException(ProjectIdentifierException exc, WebRequest request) {
        ValidationExceptionResponse response = new ValidationExceptionResponse();
        Map<String, String> errors = new HashMap<>();
        
        errors.put("projectIdentifier", exc.getMessage());
        
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(exc.getMessage());
        response.setDetails(request.getDescription(false));
        response.setTimestamp(System.currentTimeMillis());
        response.setErrors(errors);
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler
    public final ResponseEntity<ValidationExceptionResponse> handleUniqueEmailException(UniqueEmailException exc, WebRequest request) {
        ValidationExceptionResponse response = new ValidationExceptionResponse();
        Map<String, String> errors = new HashMap<>();
        
        errors.put("email", exc.getMessage());
        
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(exc.getMessage());
        response.setDetails(request.getDescription(false));
        response.setTimestamp(System.currentTimeMillis());
        response.setErrors(errors);
        
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
    /*
    @ExceptionHandler
    public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception exc, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse();
        
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setMessage(exc.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        response.setDetails(request.getDescription(false));
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }*/

}
