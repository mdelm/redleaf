package com.redleaf.web;

import com.redleaf.domain.Project;
import com.redleaf.service.ProjectService;
import com.redleaf.web.errors.ValidationException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    @PostMapping
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        Project newProject = projectService.save(project);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

}
