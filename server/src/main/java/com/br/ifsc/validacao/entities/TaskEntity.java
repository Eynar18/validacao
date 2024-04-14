package com.br.ifsc.validacao.entities;

import com.br.ifsc.validacao.enums.TaskPriority;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "task")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", unique = true, nullable = false, updatable = false)
    private UUID id;

    @NotBlank
    @Size(max = 255)
    @Column
    private String description;

    @NotNull
    @FutureOrPresent(message = "Deadline must be a present or future date")
    @Column
    private LocalDate deadline;

    @NotNull
    @Column
    @Enumerated(EnumType.ORDINAL)
    @Convert(converter = TaskPriority.TaskPriorityConverter.class)
    private TaskPriority priority;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
