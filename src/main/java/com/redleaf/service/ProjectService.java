package com.redleaf.service;

import com.redleaf.domain.Project;
import com.redleaf.repository.ProjectRepository;
import com.redleaf.web.errors.ProjectIdentifierException;
import com.redleaf.web.errors.ProjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public Project save(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception exc) {
            throw new ProjectIdentifierException(String.format("Project Idientifier '%s' already exists.", project.getProjectIdentifier()));
        }
    }
    
    public Project findProjectByIdentifier(String identifier) {
        Project project = projectRepository.findByProjectIdentifier(identifier);
        
        if (project == null)
            throw new ProjectNotFoundException(String.format("Project Id '%s' does not exists", identifier));
        
        return project;
    }
    
    public Iterable<Project> getAllProjects() { 
        return projectRepository.findAll(); 
    }

}
