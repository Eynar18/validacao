package com.br.ifsc.validacao.http.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Getter
public class ApiExceptionResponse {

    private final String url;
    private final int statusCode;
    private final HttpStatus statusMessage;
    private final String message;
    @Setter
    private Map<String, String> validationErrors;

    public ApiExceptionResponse(HttpStatus status, String message, String url) {
        this.url = url;
        this.statusCode = status.value();
        this.statusMessage = status;
        this.message = message;
    }
}