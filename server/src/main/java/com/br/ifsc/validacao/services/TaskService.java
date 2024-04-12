package com.br.ifsc.validacao.services;

import com.br.ifsc.validacao.dto.TaskDto;
import com.br.ifsc.validacao.entities.TaskEntity;

import java.util.List;
import java.util.UUID;

public interface TaskService {

    TaskDto create(TaskEntity task);
    TaskDto update(UUID id, TaskEntity task);
    void delete(UUID id);
    List<TaskDto> list();
    TaskDto findById(UUID id);

}
