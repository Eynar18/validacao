package com.br.ifsc.validacao.services;

import com.br.ifsc.validacao.dto.AccountDto;
import com.br.ifsc.validacao.entities.AccountEntity;

public interface AccountService {

    AccountDto create(AccountEntity account);
}
