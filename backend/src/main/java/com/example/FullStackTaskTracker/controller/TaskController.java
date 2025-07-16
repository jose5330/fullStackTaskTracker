package com.example.FullStackTaskTracker.controller;

import com.example.FullStackTaskTracker.model.Task;
import com.example.FullStackTaskTracker.repository.TaskRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getTasks() {return taskRepository.findAll();}

    @PostMapping
    public Task createTask(@RequestBody Task task) {return taskRepository.save(task);}

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task task) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            Task existingTask = taskOptional.get();
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setCompleted(task.isCompleted());
            return taskRepository.save(existingTask);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with id: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            taskRepository.delete(taskOptional.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Task not found with id: " + id);
        }
    }
}