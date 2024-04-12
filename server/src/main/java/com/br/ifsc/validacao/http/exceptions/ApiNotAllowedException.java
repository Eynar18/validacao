package com.br.ifsc.validacao.http.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiNotAllowedException extends RuntimeException {

    private final String message;
    private final HttpStatus status;

    public ApiNotAllowedException(String message) {
        this.message = message;
        this.status = HttpStatus.METHOD_NOT_ALLOWED;
    }
}
