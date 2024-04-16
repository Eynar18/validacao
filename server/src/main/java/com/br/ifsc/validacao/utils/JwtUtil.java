package com.br.ifsc.validacao.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    public String generateToken(String username) {
        long expirationTime = 1000 * 60 * 60;
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", username);
        claims.put("iat", new Date());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(JwtSecretKey.getKey())
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(JwtSecretKey.getKey()).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(JwtSecretKey.getKey())
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}