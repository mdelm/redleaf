package com.redleaf.service;

import com.redleaf.domain.Project;
import com.redleaf.domain.Task;
import com.redleaf.repository.ProjectRepository;
import com.redleaf.repository.TaskRepository;
import com.redleaf.web.rest.errors.ProjectNotFoundException;
import com.redleaf.web.rest.errors.TaskNotFoundException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectService projectService;
    
    private Logger logger = LoggerFactory.getLogger(TaskService.class);
    
    public Task save(Task task, String projectId, String username) {
        Project project = projectService.getProjectOrThrowException(projectId, username);
        
        Integer taskSequence = project.getBacklog().getTaskSequence() + 1;
        project.getBacklog().setTaskSequence(taskSequence);
        
        task.setProject(project);
        task.setSequence(String.format("%s-%d", project.getProjectIdentifier(), taskSequence));
        if (task.getPriority() == null) task.setPriority(3);
        if (task.getStatus() == null) task.setStatus("TO_DO");
        
        return taskRepository.save(task);
    }
    
    public Task getOne(String sequence, String projectId, String username) {
        return getTaskOrThrowException(sequence, projectId, username);
    }
    
    public List<Task> getTasksByProject(String projectId, String username) {
        Project project = projectService.getProjectOrThrowException(projectId, username);
        
        return taskRepository.findAllByProjectOrderByPriority(project);
    }
    
    public Task udpate(Task tsk, String projectId, String username) {
        Task task = getTaskOrThrowException(tsk.getSequence(), projectId, username);
        task.clone(tsk);
        
        return taskRepository.save(task);
    }
    
    public void deleteTask(String sequence, String projectId, String username) {
        taskRepository.delete( getTaskOrThrowException(sequence, projectId, username) );
    }
    
    public Task getTaskOrThrowException(String sequence, String projectId, String username) {
        Project project = projectService.getProjectOrThrowException(projectId, username);
        Task task = taskRepository.findBySequence(sequence);
        
        if (task == null || !project.getTasks().contains(task))
            throw new TaskNotFoundException(String.format("Task sequence '%s' does not exists", sequence));
        
        return task;
    }

}
