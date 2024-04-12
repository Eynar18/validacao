package com.br.ifsc.validacao.controllers;

import com.br.ifsc.validacao.dto.TaskDto;
import com.br.ifsc.validacao.entities.TaskEntity;
import com.br.ifsc.validacao.http.ApiGenericResponse;
import com.br.ifsc.validacao.services.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    ApiGenericResponse create(@Valid @RequestBody TaskEntity task) {
        taskService.create(task);
        return new ApiGenericResponse("Task created!");
    }

    @PutMapping("/{id}")
    TaskDto update(@PathVariable("id") UUID id, @Valid @RequestBody TaskEntity task) {
        return taskService.update(id, task);
    }

    @DeleteMapping("/{id}")
    public ApiGenericResponse deleteById(@PathVariable("id") UUID id) {
        taskService.delete(id);
        return new ApiGenericResponse("Task deleted!");
    }

    @GetMapping
    public List<TaskDto> list() {
        return taskService.list();
    }

    @GetMapping("/{id}")
    public TaskDto findById(@PathVariable("id") UUID id) {
        return taskService.findById(id);
    }
}
