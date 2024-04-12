package com.br.ifsc.validacao.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {

    private UUID id;
    private String username;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
