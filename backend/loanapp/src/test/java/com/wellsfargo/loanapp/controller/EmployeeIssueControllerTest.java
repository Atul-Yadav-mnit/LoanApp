package com.wellsfargo.loanapp.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import com.wellsfargo.loanapp.config.TestSecurityConfiguration;
import org.junit.jupiter.api.Test;
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
import com.wellsfargo.loanapp.dto.EmployeeIssueDTO;
import com.wellsfargo.loanapp.model.EmployeeCardDetails;
import com.wellsfargo.loanapp.model.EmployeeIssueDetails;
import com.wellsfargo.loanapp.service.EmployeeCardService;
import com.wellsfargo.loanapp.service.EmployeeIssueService;
import com.wellsfargo.loanapp.service.ResponseGenerator;

@WebMvcTest(EmployeeIssueController.class)
@ContextConfiguration(classes = TestSecurityConfiguration.class)
@Import(EmployeeIssueController.class)
public class EmployeeIssueControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private EmployeeIssueService employeeIssueService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public EmployeeIssueDTO getEmployeeIssue()
	{
		return new EmployeeIssueDTO();
	}
	
	@Test
	public void getAllEmployeeCard_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		
		List<EmployeeIssueDTO> employeeIssueList = new ArrayList<>();
		employeeIssueList.add(getEmployeeIssue());
		String employeeId = "123456";
		
		ResponseEntity<List<EmployeeIssueDTO>> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employeeIssueList);
		
		when(employeeIssueService.getAllEmployeeIssue(employeeId)).thenReturn(response);
		
		MvcResult result = mvc.perform(get("/api/v1/employeeIssue/"+employeeId+"/all")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andReturn();
		
		verify(employeeIssueService,times(1)).getAllEmployeeIssue(employeeId);
		
		
	}
	
}
