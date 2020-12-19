package com.redleaf.service;

import com.redleaf.domain.Backlog;
import com.redleaf.domain.Project;
import com.redleaf.repository.ProjectRepository;
import com.redleaf.web.rest.errors.ProjectIdentifierException;
import com.redleaf.web.rest.errors.ProjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public Project save(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            project.setBacklog(new Backlog());

            return projectRepository.save(project);
        } catch (Exception exc) {
            throw new ProjectIdentifierException(String.format("Project Idientifier '%s' already exists.", project.getProjectIdentifier()));
        }
    }
    
    public void update(Project project) {
        Project proj = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
        
        if (proj == null)
            throw new ProjectNotFoundException(String.format("Project Id '%s' does not exists", project.getProjectIdentifier()));
        
        projectRepository.save(project);
    }
    
    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project Id '%s' does not exists", projectId));
        
        return project;
    }
    
    public Iterable<Project> getAllProjects() { 
        return projectRepository.findAll(); 
    }
    
    public void deleteProject(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project Id '%s' does not exists", projectId));
        
        projectRepository.delete(project);
    }

}
