package com.br.ifsc.validacao.utils;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;

import java.security.Key;

public class JwtSecretKey {
    @Getter
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
}
