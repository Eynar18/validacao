package com.br.ifsc.validacao.http.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiNotFoundException extends RuntimeException {

    private final String message;
    private final HttpStatus status;

    public ApiNotFoundException(String message) {
        this.message = message;
        this.status = HttpStatus.NOT_FOUND;
    }
}