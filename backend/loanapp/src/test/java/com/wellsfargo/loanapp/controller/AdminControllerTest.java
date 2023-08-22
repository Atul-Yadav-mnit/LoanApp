package com.wellsfargo.loanapp.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import com.wellsfargo.loanapp.dto.AdminDTO;
import com.wellsfargo.loanapp.model.Admin;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.service.AdminService;
import com.wellsfargo.loanapp.service.ResponseGenerator;

@WebMvcTest(AdminController.class)
public class AdminControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	AdminService adminService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public AdminDTO getAdmin()
	{
		return new AdminDTO();
	}
	
	@Test
	public void adminLogin_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String json = "{ \"username\" : \"admin\", \"password\" : \"password\"}";
		AdminDTO admin = getAdmin();
		
		ResponseEntity<AdminDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,admin);
		
		when(adminService.validateAdmin(any())).thenReturn(response);
		
		MvcResult result = mvc.perform(post("/admin/login")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(json)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andReturn();
		
		verify(adminService,times(1)).validateAdmin(any());
		
	}
}
