package com.redleaf.web.rest.io;

public class JwtAuthenticationResponse {
    
    private String jwt;
    private String message;

    public JwtAuthenticationResponse() {
    }

    public JwtAuthenticationResponse(String jwt, String message) {
        this.jwt = jwt;
        this.message = message;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
