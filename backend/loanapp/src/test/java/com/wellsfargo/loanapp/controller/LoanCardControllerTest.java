package com.wellsfargo.loanapp.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.wellsfargo.loanapp.config.TestSecurityConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.UserDetails;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.ArgumentMatchers.eq;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanapp.dto.LoanCardDTO;
import com.wellsfargo.loanapp.service.LoanCardService;
import com.wellsfargo.loanapp.serviceImpl.ResponseGenerator;

@WebMvcTest(LoanCardController.class)
@ContextConfiguration(classes = TestSecurityConfiguration.class)
@Import(LoanCardController.class)
public class LoanCardControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private LoanCardService loanCardService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public LoanCardDTO getLoanCard()
	{
		LoanCardDTO loanCard = new LoanCardDTO();
		loanCard.setLoanId("123456");
		loanCard.setLoanType("Furniture");
		loanCard.setDurationOfYears(13);
		return loanCard;
	}
	
	@Test
	public void getAllLoanCards_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		
		List<LoanCardDTO> loanCardList = new ArrayList<>();
		loanCardList.add(getLoanCard());
		
		ResponseEntity<List<LoanCardDTO>> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,loanCardList);
		
		when(loanCardService.getAllLoanCards()).thenReturn(response);
		
		MvcResult result = mvc.perform(get("/api/v1/loanCard/all").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andReturn();
		
		verify(loanCardService,times(1)).getAllLoanCards();
		
		
	}
	
	@Test
	public void saveLoanCard_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"loanType\":\"Furniture\",\"durationOfYears\":13}";
		LoanCardDTO loanCard = getLoanCard();
		String userName = "admin";
		
		ResponseEntity<LoanCardDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,loanCard);
		
		when(loanCardService.saveLoanCard(nullable(UserDetails.class), any(LoanCardDTO.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(post("/api/v1/loanCard/add?userName=admin")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(loanCardService,times(1)).saveLoanCard(nullable(UserDetails.class), any(LoanCardDTO.class));
	}
	
	@Test
	public void updateLoanCard_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"loanType\":\"Furniture\",\"durationOfYears\":13}";
		LoanCardDTO loanCard = getLoanCard();
		String loanCardId = loanCard.getLoanId();
		String userName = "admin";
		
		ResponseEntity<LoanCardDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,loanCard);
		
		when(loanCardService.updateLoanCard(nullable(UserDetails.class), eq(loanCardId), any(LoanCardDTO.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(put("/api/v1/loanCard/"+loanCardId+"?userName=admin")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(loanCardService,times(1)).updateLoanCard(nullable(UserDetails.class), eq(loanCardId), any(LoanCardDTO.class));
	}
	
	@Test
	public void deleteLoanCard_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		LoanCardDTO loanCard = getLoanCard();
		String loanCardId = loanCard.getLoanId();
		String userName = "admin";
		
		ResponseEntity<LoanCardDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,loanCard);
		
		when(loanCardService.deleteLoanCard(nullable(UserDetails.class), eq(loanCardId))).thenReturn(response);
		
		MvcResult result = mvc.perform(delete("/api/v1/loanCard/"+loanCardId+"?userName=admin")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(loanCardService,times(1)).deleteLoanCard(nullable(UserDetails.class), eq(loanCardId));
	}

}
