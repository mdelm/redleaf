package com.redleaf.service;

import com.redleaf.domain.Project;
import com.redleaf.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public Project save(Project project) {
        return projectRepository.save(project);
    }

}
