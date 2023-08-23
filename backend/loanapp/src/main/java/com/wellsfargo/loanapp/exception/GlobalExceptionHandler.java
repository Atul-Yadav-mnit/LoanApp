package com.wellsfargo.loanapp.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Map<String, String>>> handleMethodArgNotValidException(MethodArgumentNotValidException exception){
		Map <String, Map<String, String>> response = new HashMap<>();
		Map <String, String> body = new HashMap<>();
		Map <String, String> msg = new HashMap<>();
		msg.put("response", "Form inputs are not valid !!");
		response.put("message", msg);
		exception.getBindingResult().getAllErrors().forEach((error)->{
			String fieldName = ((FieldError)error).getField();
			String message = error.getDefaultMessage();
			
			body.put(fieldName, message);
		});
		
		response.put("body", body);
		
		return new ResponseEntity<Map<String, Map<String, String>>>(response, HttpStatus.BAD_REQUEST);
		
	}

}
