package com.redleaf.web;

import com.redleaf.domain.Project;
import com.redleaf.service.ProjectService;
import com.redleaf.web.errors.ValidationException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
    
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProject(@PathVariable(name = "projectId") String projectId) {
        Project project = projectService.findProjectByIdentifier(projectId.toUpperCase());
        return new ResponseEntity<>(project, HttpStatus.OK);
    }
    
    @GetMapping
    public ResponseEntity<?> getAllProjects() {
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }
    
    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable(name = "projectId") String projectId) {
        projectService.deleteProject(projectId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    @PutMapping
    public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult result) {
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        projectService.save(project);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
