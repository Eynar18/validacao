package com.br.ifsc.validacao.handler;

import com.br.ifsc.validacao.http.exceptions.ApiExceptionResponse;
import com.br.ifsc.validacao.http.exceptions.ApiGenericException;
import com.br.ifsc.validacao.http.exceptions.ApiNotAllowedException;
import com.br.ifsc.validacao.http.exceptions.ApiNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ApiExceptionResponse handleUnreadableException(HttpMessageNotReadableException ex, HttpServletRequest req) {
        return new ApiExceptionResponse(HttpStatus.BAD_REQUEST, "JSON parse error", req.getServletPath());
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ApiExceptionResponse handleBadCredentialsException(BadCredentialsException ex, HttpServletRequest req) {
        return new ApiExceptionResponse(HttpStatus.BAD_REQUEST, "Credentials are invalid", req.getServletPath());
    }

    @ExceptionHandler(ApiGenericException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ApiExceptionResponse handleGenericException(ApiGenericException ex, HttpServletRequest req) {
        return new ApiExceptionResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), req.getServletPath());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiExceptionResponse handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest req) {
        ApiExceptionResponse apiExceptionResponse = new ApiExceptionResponse(HttpStatus.BAD_REQUEST, "Invalid body", req.getServletPath());
        Map<String, String> validationErrors =  new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            validationErrors.put(error.getField(), error.getDefaultMessage());
        });

        apiExceptionResponse.setValidationErrors(validationErrors);
        return apiExceptionResponse;
    }

    @ExceptionHandler(ApiNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ApiExceptionResponse handleNotFoundException(ApiNotFoundException ex, HttpServletRequest req) {
        return new ApiExceptionResponse(HttpStatus.NOT_FOUND, ex.getMessage(), req.getServletPath());
    }

    @ExceptionHandler(ApiNotAllowedException.class)
    @ResponseStatus(value = HttpStatus.METHOD_NOT_ALLOWED)
    public ApiExceptionResponse handleNotFoundException(ApiNotAllowedException ex, HttpServletRequest req) {
        return new ApiExceptionResponse(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage(), req.getServletPath());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiExceptionResponse handlePSQLException(HttpServletRequest req) {
        return new ApiExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Database error", req.getServletPath());
    }
}