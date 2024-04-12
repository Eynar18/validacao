package com.br.ifsc.validacao.repositories;

import com.br.ifsc.validacao.entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, UUID> {

    AccountEntity findByUsername(String username);

}
