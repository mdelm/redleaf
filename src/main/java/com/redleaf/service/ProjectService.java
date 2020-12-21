package com.redleaf.service;

import com.redleaf.domain.Backlog;
import com.redleaf.domain.Project;
import com.redleaf.domain.User;
import com.redleaf.repository.ProjectRepository;
import com.redleaf.repository.UserRepository;
import com.redleaf.web.rest.errors.ProjectIdentifierException;
import com.redleaf.web.rest.errors.ProjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Project save(Project project, String username) {
        User user = userRepository.findByEmail(username);
        
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            project.setBacklog(new Backlog());
            project.setUser(user);

            return projectRepository.save(project);
        } catch (Exception exc) {
            throw new ProjectIdentifierException(String.format("Project Idientifier '%s' already exists.", project.getProjectIdentifier()));
        }
    }
    
    public void update(Project prj, String username) {
        Project project = getProjectOrThrowException(prj.getProjectIdentifier(), username);  
        project.clone(prj);
        projectRepository.save(project);
    }
    
    public Project findProjectByIdentifier(String projectId, String username) {
        return getProjectOrThrowException(projectId, username);
    }
    
    public Iterable<Project> getAllProjects(String username) {
        return projectRepository.findAllByUser( userRepository.findByEmail(username) ); 
    }
    
    public void deleteProject(String projectId, String username) {
        projectRepository.delete( getProjectOrThrowException(projectId, username) );
    }
    
    public Project getProjectOrThrowException(String projectId, String username) {
        User user = userRepository.findByEmail(username);
        Project project = projectRepository.findByProjectIdentifier(projectId);
        
        if (project == null || !project.getUser().equals(user))
            throw new ProjectNotFoundException(String.format("Project Id '%s' does not exists", projectId));
        
        return project;
    }

}
