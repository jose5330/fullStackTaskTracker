package com.example.FullStackTaskTracker.repository;

import com.example.FullStackTaskTracker.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
