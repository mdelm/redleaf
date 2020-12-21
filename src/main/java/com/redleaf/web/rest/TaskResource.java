package com.redleaf.web.rest;

import com.redleaf.domain.Task;
import com.redleaf.service.TaskService;
import com.redleaf.web.rest.errors.ValidationException;
import java.security.Principal;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping("/api/projects/{projectId}/tasks")
@CrossOrigin
public class TaskResource {
    
    @Autowired
    private TaskService taskService;
    
    private Logger logger = LoggerFactory.getLogger(TaskResource.class);
    
    @GetMapping
    public ResponseEntity<?> getTasksByProject(@PathVariable(name = "projectId") String projectId, Principal principal) {
        List<Task> tasks = taskService.getTasksByProject(projectId, principal.getName());
        
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<?> createTask(@Valid @RequestBody Task task, BindingResult result, @PathVariable(name = "projectId") String projectId, Principal principal) {
        
        if (result.hasErrors()) 
            throw new ValidationException(result);
        
        Task newTask = taskService.save(task, projectId, principal.getName());
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }
    
    @PutMapping
    public ResponseEntity<?> updateTask(@Valid @RequestBody Task task, BindingResult result, @PathVariable(name = "projectId") String projectId, Principal principal) {
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        taskService.udpate(task, projectId, principal.getName());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    @DeleteMapping("/{sequence}")
    public ResponseEntity<?> deleteTask(@PathVariable(name = "sequence") String sequence, @PathVariable(name = "projectId") String projectId, Principal principal) {
        taskService.deleteTask(sequence, projectId, principal.getName());
        
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    @GetMapping("/{sequence}")
    public ResponseEntity<?> getTask(@PathVariable(name = "sequence") String sequence, @PathVariable(name = "projectId") String projectId, Principal principal) {
        Task task = taskService.getOne(sequence, projectId, principal.getName());
        
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

}
