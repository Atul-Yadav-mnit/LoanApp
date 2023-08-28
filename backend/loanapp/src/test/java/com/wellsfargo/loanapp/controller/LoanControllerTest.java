package com.wellsfargo.loanapp.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.wellsfargo.loanapp.config.TestSecurityConfiguration;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanapp.service.LoanService;
import com.wellsfargo.loanapp.service.ResponseGenerator;

@WebMvcTest(LoanController.class)
@ContextConfiguration(classes = TestSecurityConfiguration.class)
@Import(LoanController.class)
public class LoanControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private LoanService loanService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	@Test
	public void testApplyLoan() throws Exception {
		String json = "{ \"loanCardId\" : \"1\", \"employeeId\" : \"1\", \"itemId\" : \"2\"}";
		
		ResponseEntity<String> applyLoanResponse = ResponseGenerator.generateResponse(HttpStatus.OK, "Application Successfull", null);
		
		when(loanService.applyLoan(any(String.class), any(String.class), any(String.class))).thenReturn(applyLoanResponse);
		
		MvcResult result = mvc.perform(post("/api/v1/loan/apply")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(json)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().json(objectMapper.writeValueAsString(applyLoanResponse.getBody())))
				.andReturn();
		
		verify(loanService,times(1)).applyLoan(any(String.class), any(String.class), any(String.class));
	}
	
}
