package com.br.ifsc.validacao.repositories;

import com.br.ifsc.validacao.entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

    @Query(value = "SELECT t FROM TaskEntity t ORDER BY t.priority ")
    List<TaskEntity> findAllOrderByPriority();
}
