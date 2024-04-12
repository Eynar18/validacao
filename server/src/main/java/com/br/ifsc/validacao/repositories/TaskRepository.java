package com.br.ifsc.validacao.repositories;

import com.br.ifsc.validacao.entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

}
