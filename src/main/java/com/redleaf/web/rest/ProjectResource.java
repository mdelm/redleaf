package com.redleaf.web.rest;

import com.redleaf.domain.Project;
import com.redleaf.service.ProjectService;
import com.redleaf.web.rest.errors.ValidationException;
import java.security.Principal;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectResource {
    
    @Autowired
    private ProjectService projectService;
    
    @PostMapping
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        Project newProject = projectService.save(project, principal.getName());
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }
    
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProject(@PathVariable(name = "projectId") String projectId, Principal principal) {
        Project project = projectService.findProjectByIdentifier(projectId.toUpperCase(), principal.getName());
        return new ResponseEntity<>(project, HttpStatus.OK);
    }
    
    @GetMapping
    public ResponseEntity<?> getAllProjects(Principal principal) {
        return new ResponseEntity<>(projectService.getAllProjects(principal.getName()), HttpStatus.OK);
    }
    
    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable(name = "projectId") String projectId, Principal principal) {
        projectService.deleteProject(projectId, principal.getName());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    @PutMapping
    public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        projectService.update(project, principal.getName());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
