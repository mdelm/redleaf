package com.redleaf.web;

import com.redleaf.domain.Task;
import com.redleaf.service.TaskService;
import com.redleaf.web.errors.ValidationException;
import java.util.List;
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
@RequestMapping("/api/projects/{projectId}/tasks")
@CrossOrigin
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @GetMapping
    public ResponseEntity<?> getTasksByProject(@PathVariable(name = "projectId") String projectId) {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<?> createTask(@PathVariable(name = "projectId") String projectId, @Valid @RequestBody Task task, BindingResult result) {
        Task newTask = taskService.save(task, projectId);
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }
    
    @PutMapping
    public ResponseEntity<?> updateTask(@PathVariable(name = "projectId") String projectId, @Valid @RequestBody Task task, BindingResult result) {
        taskService.udpate(task, projectId);
        
        if (result.hasErrors())
            throw new ValidationException(result);
        
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    @DeleteMapping("/{sequence}")
    public ResponseEntity<?> deleteTask(@PathVariable(name = "sequence") String sequence, @PathVariable(name = "projectId") String projectId) {
        taskService.deleteTask(sequence, projectId);
        
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    @GetMapping("/{sequence}")
    public ResponseEntity<?> getTask(@PathVariable(name = "sequence") String sequence, @PathVariable(name = "projectId") String projectId) {
        Task task = taskService.getOne(sequence, projectId);
        
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

}
