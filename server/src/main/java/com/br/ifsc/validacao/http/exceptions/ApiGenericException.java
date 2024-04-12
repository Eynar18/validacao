package com.br.ifsc.validacao.http.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiGenericException extends RuntimeException {

    private final String message;
    private final HttpStatus status;

    public ApiGenericException(String message) {
        this.message = message;
        this.status = HttpStatus.BAD_REQUEST;
    }
}