package com.redleaf.web.rest.io;

import javax.validation.constraints.NotBlank;

public class JwtAuthenticationRequest {
    
    @NotBlank(message = "Please type your email address")
    private String username;
    
    @NotBlank(message = "Please enter your password")
    private String password;

    public JwtAuthenticationRequest() {
    }

    public JwtAuthenticationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
