package com.br.ifsc.validacao.services.impl;

import com.br.ifsc.validacao.dto.TaskDto;
import com.br.ifsc.validacao.entities.TaskEntity;
import com.br.ifsc.validacao.http.exceptions.ApiNotFoundException;
import com.br.ifsc.validacao.repositories.TaskRepository;
import com.br.ifsc.validacao.services.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public TaskDto create(TaskEntity task) {
        TaskEntity newTask = taskRepository.save(task);
        return modelMapper.map(newTask, TaskDto.class);
    }

    @Override
    public TaskDto update(UUID id, TaskEntity task) {
        task.setId(id);
        TaskEntity updatedTask = taskRepository.save(task);
        return modelMapper.map(updatedTask, TaskDto.class);
    }

    @Override
    public void delete(UUID id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<TaskDto> list() {
        List<TaskEntity> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(task -> modelMapper.map(task, TaskDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto findById(UUID id) {
        TaskEntity task = taskRepository.findById(id).orElseThrow(() -> new ApiNotFoundException("Task not found"));
        return modelMapper.map(task, TaskDto.class);
    }
}
