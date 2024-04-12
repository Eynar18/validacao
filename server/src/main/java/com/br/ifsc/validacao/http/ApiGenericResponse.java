package com.br.ifsc.validacao.http;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiGenericResponse {

    private String message;

    public ApiGenericResponse(String message) {
        this.message = message;
    }
}
