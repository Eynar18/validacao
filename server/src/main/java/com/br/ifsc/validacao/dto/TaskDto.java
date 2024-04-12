package com.br.ifsc.validacao.dto;

import com.br.ifsc.validacao.enums.TaskPriority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {

    private UUID id;
    private String description;
    private LocalDate deadline;
    private TaskPriority priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
