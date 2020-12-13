package com.redleaf.service;

import com.redleaf.domain.Project;
import com.redleaf.repository.ProjectRepository;
import com.redleaf.web.errors.ProjectIdentifierException;
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

}
