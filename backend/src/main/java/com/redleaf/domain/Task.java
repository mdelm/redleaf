package com.redleaf.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;

@Entity
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(updatable = false, unique = true)
    private String sequence;
    
    @NotBlank(message = "Please include a project summary")
    private String summary;
    private String acceptanceCriteria;
    private String status;
    private Integer priority;
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dueDate;
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    private Date createAt;
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updateAt;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    public Task() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getAcceptanceCriteria() {
        return acceptanceCriteria;
    }

    public void setAcceptanceCriteria(String acceptanceCriteria) {
        this.acceptanceCriteria = acceptanceCriteria;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    
    @PrePersist
    protected void onCreate() {
        this.createAt = new Date();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updateAt = new Date();
    }

    @Override
    public String toString() {
        return "Task{" + "id=" + id + ", sequence=" + sequence + ", summary=" + summary + ", acceptanceCriteria=" + acceptanceCriteria + ", status=" + status + ", priority=" + priority + ", dueDate=" + dueDate + ", createAt=" + createAt + ", updateAt=" + updateAt + ", project=" + project + '}';
    }
    
    public void clone(Task other) {
        if ( other.getSummary() != null && !this.summary.equals(other.getSummary()) )
            this.summary = other.getSummary();
                    
        if ( other.getAcceptanceCriteria() != null && !this.acceptanceCriteria.equals(other.getAcceptanceCriteria()) )
            this.acceptanceCriteria = other.getAcceptanceCriteria();
        
        if ( other.getDueDate() != null && !this.dueDate.equals(other.getDueDate()) )
            this.dueDate = other.getDueDate();
        
        if ( other.getPriority() != null && !this.priority.equals(other.getPriority()) )
            this.priority = other.getPriority();
        
        if ( other.getStatus() != null && !this.status.equals(other.getStatus()) )
            this.status = other.getStatus();
    }

}
