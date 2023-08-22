package com.wellsfargo.loanapp.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanapp.dto.EmployeeCardDTO;
import com.wellsfargo.loanapp.model.EmployeeCardDetails;
import com.wellsfargo.loanapp.service.EmployeeCardService;
import com.wellsfargo.loanapp.service.ResponseGenerator;

@WebMvcTest(EmployeeCardController.class)
public class EmployeeCardControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private EmployeeCardService employeeCardService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public EmployeeCardDTO getEmployeeCard()
	{
		return new EmployeeCardDTO();
	}
	
	@Test
	public void getAllEmployeeCard_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		
		List<EmployeeCardDTO> employeeCardDtoList = new ArrayList<>();
		employeeCardDtoList.add(getEmployeeCard());
		String employeeId = "123456";
		
		ResponseEntity<List<EmployeeCardDTO>> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employeeCardDtoList);
		
		when(employeeCardService.getAllEmployeeCard(employeeId)).thenReturn(response);
		
		MvcResult result = mvc.perform(get("/employeeCard/"+employeeId+"/all")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andReturn();
		
		verify(employeeCardService,times(1)).getAllEmployeeCard(employeeId);
		
		
	}
	
}
