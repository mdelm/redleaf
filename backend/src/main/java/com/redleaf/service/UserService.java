package com.redleaf.service;

import java.util.ArrayList;
import com.redleaf.domain.User;
import com.redleaf.repository.UserRepository;
import com.redleaf.web.rest.errors.UniqueEmailException;
import com.redleaf.web.rest.errors.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    private Logger logger = LoggerFactory.getLogger(UserService.class);

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        
        if (user == null)
            throw new UserNotFoundException(String.format("The email '%s' does not exists.", email));

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
    
    public void save(User newUser) {
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            userRepository.save(newUser);
        } catch (RuntimeException exc) {
            throw new UniqueEmailException(String.format("Email address '%s' already exists.", newUser.getEmail()));
        }
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
