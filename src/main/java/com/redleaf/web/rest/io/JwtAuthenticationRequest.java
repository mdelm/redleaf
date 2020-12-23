package com.redleaf.web.rest.io;

import javax.validation.constraints.NotBlank;

public class JwtAuthenticationRequest {
    
    @NotBlank(message = "Please type your email address")
    private String email;
    
    @NotBlank(message = "Please enter your password")
    private String password;

    public JwtAuthenticationRequest() {
    }

    public JwtAuthenticationRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
