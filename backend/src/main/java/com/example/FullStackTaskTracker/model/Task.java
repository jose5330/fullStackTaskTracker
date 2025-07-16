package com.example.FullStackTaskTracker.model;

import jakarta.validation.constraints.NotBlank;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity

public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}

	@Column(name = "title")
	//@NotBlank(message = "Title cannot be blank")
	private String title;
	public String getTitle() {return title;}
	public void setTitle(String title) {this.title = title;}
	
	@Column(name = "description")
	private String description;
	public String getDescription() {return description;}
	public void setDescription(String description) {this.description = description;}

	@Column(name = "completed")
	private boolean completed;
	public boolean isCompleted() {return completed;}
	public void setCompleted(boolean completed) {this.completed = completed;}

	public Task() {}
}
