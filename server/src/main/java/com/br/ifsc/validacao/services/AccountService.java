package com.br.ifsc.validacao.services;

import com.br.ifsc.validacao.dto.AccountDto;
import com.br.ifsc.validacao.entities.AccountEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface AccountService {

    AccountDto create(AccountEntity account);
    UserDetails loadUserByUsername(String username);
}
