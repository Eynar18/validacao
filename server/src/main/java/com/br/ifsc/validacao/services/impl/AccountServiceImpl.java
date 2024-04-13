package com.br.ifsc.validacao.services.impl;

import com.br.ifsc.validacao.dto.AccountDto;
import com.br.ifsc.validacao.entities.AccountEntity;
import com.br.ifsc.validacao.http.exceptions.ApiNotAllowedException;
import com.br.ifsc.validacao.http.exceptions.ApiNotFoundException;
import com.br.ifsc.validacao.repositories.AccountRepository;
import com.br.ifsc.validacao.services.AccountService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AccountServiceImpl implements AccountService, UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public AccountDto create(AccountEntity account) {
        AccountEntity accountInDb = accountRepository.findByUsername(account.getUsername());

        if (Objects.nonNull(accountInDb)) {
            throw new ApiNotAllowedException("User name already exists");
        }

        account.setPassword(passwordEncoder.encode(account.getPassword()));
        AccountEntity newAccount = accountRepository.save(account);
        return modelMapper.map(newAccount, AccountDto.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        AccountEntity account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new ApiNotFoundException("Account not found with username: " + username);
        }

        return User.withUsername(account.getUsername())
                .password(account.getPassword())
                .roles("USER")
                .build();
    }
}
