package com.redleaf.web.rest;

import com.redleaf.domain.User;
import static com.redleaf.security.SecurityConstants.TOKEN_PREFIX;
import com.redleaf.security.jwt.TokenProvider;
import com.redleaf.service.UserService;
import com.redleaf.web.rest.errors.AuthenticationException;
import com.redleaf.web.rest.errors.ValidationException;
import com.redleaf.web.rest.io.JwtAuthenticationRequest;
import com.redleaf.web.rest.io.JwtAuthenticationResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserResource {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private TokenProvider tokenProvider;
    
    /*@Autowired
    private PasswordEncoder passwordEncoder;*/
    
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException exc) {
            throw new AuthenticationException("Incorrect username or password");
        }
        
        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = tokenProvider.generateToken(userDetails);
        
        return ResponseEntity.ok(new JwtAuthenticationResponse(TOKEN_PREFIX + " " + jwt));
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        userService.save(user);
        
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

}
