package com.redleaf.repository;

import com.redleaf.domain.Project;
import com.redleaf.domain.User;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    public Project findByProjectIdentifier(String projectIdentifier);
    
    public List<Project> findAllByUser(User user);

}
