package com.redleaf.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Backlog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer taskSequence = 0;
    
    @OneToOne(mappedBy = "backlog", fetch = FetchType.EAGER)
    @JsonIgnore
    private Project project;

    public Backlog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTaskSequence() {
        return taskSequence;
    }

    public void setTaskSequence(Integer taskSequence) {
        this.taskSequence = taskSequence;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Override
    public String toString() {
        return "Backlog{" + "id=" + id + ", taskSequence=" + taskSequence + ", project=" + project + '}';
    }

}
