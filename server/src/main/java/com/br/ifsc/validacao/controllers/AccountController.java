package com.br.ifsc.validacao.controllers;

import com.br.ifsc.validacao.entities.AccountEntity;
import com.br.ifsc.validacao.http.ApiGenericResponse;
import com.br.ifsc.validacao.services.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    ApiGenericResponse create(@Valid @RequestBody AccountEntity account) {
        accountService.create(account);
        return new ApiGenericResponse("Account created!");
    }
}
