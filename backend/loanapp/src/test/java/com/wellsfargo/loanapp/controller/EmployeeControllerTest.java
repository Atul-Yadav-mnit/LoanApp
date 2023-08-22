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
import static org.mockito.ArgumentMatchers.any;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.LoginModel;
import com.wellsfargo.loanapp.service.EmployeeService;
import com.wellsfargo.loanapp.service.ResponseGenerator;

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private EmployeeService employeeService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public EmployeeMaster getEmployee()
	{
		EmployeeMaster employee = new EmployeeMaster();
		employee.setEmployeeID("123456");
		employee.setDepartment("Technology");
		employee.setDesignation("SE1");
		employee.setEmployeeID("Wooden");
		employee.setEmployeeName("Test");
		employee.setGender('M');
		employee.setPassword("password");
		return employee;
	}
	
	@Test
	public void saveEmployee_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"employeeName\":\"Test\",\"designation\":\"SE1\",\"department\":\"Technology\",\"gender\":\"M\",\"dateOfBirth\":\"2001-09-06\",\"dateOfJoining\":\"2023-08-24\",\"password\":\"password\"}";
		EmployeeMaster employee = getEmployee();
		
		ResponseEntity<EmployeeMaster> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employee);
		
		when(employeeService.saveEmployee(any(EmployeeMaster.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(post("/employee/add")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(employeeService,times(1)).saveEmployee(any(EmployeeMaster.class));
	}
	
	@Test
	public void employeeLogin_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"employeeId\":\"123456\",\"password\":\"password\"}";
		EmployeeMaster employee = getEmployee();
		
		ResponseEntity<EmployeeMaster> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employee);
		
		when(employeeService.employeeLogin(any(LoginModel.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(post("/employee/login")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(employeeService,times(1)).employeeLogin(any(LoginModel.class));
	}
	
	@Test
	public void getAllEmployeeDetails_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		
		List<EmployeeMaster> employeeList = new ArrayList<>();
		employeeList.add(getEmployee());
		String userName = "admin";
		
		ResponseEntity<List<EmployeeMaster>> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employeeList);
		
		when(employeeService.getAllEmployeeDetails(eq(userName))).thenReturn(response);
		
		MvcResult result = mvc.perform(get("/employee/all?userName="+userName)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andReturn();
		
		verify(employeeService,times(1)).getAllEmployeeDetails(eq(userName));
	}
	
	@Test
	public void getEmployeeDetails_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		
		EmployeeMaster employee = getEmployee();
		String employeeId = employee.getEmployeeID();
		String userName = "admin";
		
		ResponseEntity<EmployeeMaster> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employee);
		
		when(employeeService.getEmployeeDetails(eq(employeeId))).thenReturn(response);
		
		MvcResult result = mvc.perform(get("/employee/"+employeeId)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andReturn();
		
		verify(employeeService,times(1)).getEmployeeDetails(eq(employeeId));
	}
	
	@Test
	public void updateEmployee_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"itemDescription\":\"Description\",\"issueStatus\":\"1\",\"itemMake\":\"Wooden\",\"itemCategory\":\"Furniture\",\"itemValuation\":2000}";
		EmployeeMaster employee = getEmployee();
		String employeeId = employee.getEmployeeID();
		String userName = "admin";
		
		ResponseEntity<EmployeeMaster> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employee);
		
		when(employeeService.updateEmployeeDetails(eq(userName), eq(employeeId), any(EmployeeMaster.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(put("/employee/"+employeeId+"?userName=admin")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(employeeService,times(1)).updateEmployeeDetails(eq(userName), eq(employeeId), any(EmployeeMaster.class));
	}
	
	@Test
	public void deleteEmployee_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		EmployeeMaster employee = getEmployee();
		String employeeId = employee.getEmployeeID();
		String userName = "admin";
		
		ResponseEntity<EmployeeMaster> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,employee);
		
		when(employeeService.deleteEmployee(eq(userName), eq(employeeId))).thenReturn(response);
		
		MvcResult result = mvc.perform(delete("/employee/"+employeeId+"?userName=admin")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(employeeService,times(1)).deleteEmployee(eq(userName), eq(employeeId));
	}

}
