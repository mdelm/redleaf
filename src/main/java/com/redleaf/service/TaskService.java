package com.redleaf.service;

import com.redleaf.domain.Project;
import com.redleaf.domain.Task;
import com.redleaf.repository.ProjectRepository;
import com.redleaf.repository.TaskRepository;
import com.redleaf.web.errors.ProjectNotFoundException;
import com.redleaf.web.errors.TaskNotFoundException;
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
    
    private Logger logger = LoggerFactory.getLogger(TaskService.class);
    
    public Task getOne(String sequence, String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        Task task = taskRepository.findBySequence(sequence);
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project id '%s' does not exists", projectId));
        
        if (task == null || !project.getTasks().contains(task))
            throw new TaskNotFoundException(String.format("Task sequence '%s' does not exists", sequence));
        
        return task;
    }
    
    public List<Task> getTasksByProject(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project id '%s' does not exists", projectId));
        
        return taskRepository.findAllByProjectOrderByPriority(project);
    }
    
    public Task save(Task task, String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project id '%s' does not exists", projectId));
        
        Integer taskSequence = project.getBacklog().getTaskSequence() + 1;
        project.getBacklog().setTaskSequence(taskSequence);
        
        task.setProject(project);
        task.setSequence(String.format("%s-%d", project.getProjectIdentifier(), taskSequence));
        task.setPriority(3);
        task.setStatus("TO_DO");
        
        return taskRepository.save(task);
    }
    
    public Task udpate(Task task, String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        Task tsk = taskRepository.findBySequence(task.getSequence());
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project id '%s' does not exists", projectId));
        
        if (tsk == null || !project.getTasks().contains(tsk))
            throw new TaskNotFoundException(String.format("Task sequence '%s' does not exists", task.getSequence()));
        
        tsk.setPriority(task.getPriority());
        tsk.setStatus(task.getStatus());
        tsk.setSummary(task.getSummary());
        
        return taskRepository.save(tsk);
    }
    
    public void deleteTask(String sequence, String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        Task task = taskRepository.findBySequence(sequence);
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project id '%s' does not exists", projectId));
        
        if (task == null || !project.getTasks().contains(task))
            throw new TaskNotFoundException(String.format("Task sequence '%s' does not exists", sequence));
        
        taskRepository.delete(task);
    }

}
