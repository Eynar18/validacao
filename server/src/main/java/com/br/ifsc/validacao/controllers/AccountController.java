package com.br.ifsc.validacao.controllers;

import com.br.ifsc.validacao.entities.AccountEntity;
import com.br.ifsc.validacao.http.ApiGenericResponse;
import com.br.ifsc.validacao.services.AccountService;
import com.br.ifsc.validacao.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = { "http://localhost:4200", "https://localhost:4200" })
@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    ApiGenericResponse create(@Valid @RequestBody AccountEntity account) {
        accountService.create(account);
        return new ApiGenericResponse("Account created!");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AccountEntity account) throws Exception {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(account.getUsername(), account.getPassword()));

        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(account.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}
