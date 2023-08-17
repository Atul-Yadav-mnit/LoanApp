package com.wellsfargo.loanapp;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.wellsfargo.loanapp.service.AdminService;
import com.wellsfargo.loanapp.service.EmployeeCardService;
import com.wellsfargo.loanapp.service.EmployeeIssueService;
import com.wellsfargo.loanapp.service.EmployeeService;
import com.wellsfargo.loanapp.service.ItemService;
import com.wellsfargo.loanapp.service.LoanCardService;
import com.wellsfargo.loanapp.service.LoanService;

@RunWith(SpringRunner.class)
@WebMvcTest
public class ApplyLoanTest {
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private LoanService loanService;
	@MockBean
	private AdminService adminService;
	@MockBean
	private EmployeeCardService employeeCardService;
	@MockBean
	private EmployeeIssueService employeeIssueService;
	@MockBean
	private EmployeeService employeeService;
	@MockBean
	private ItemService itemService;
	@MockBean
	private LoanCardService loanCardService;
	
	@Test
	public void testApplyLoan() throws Exception {
		String json = "{ \"loanCardId\" : \"1\", \"employeeId\" : \"1\", \"itemId\" : \"2\"}";
		String applyLoanResponse = "Loan Application successfull";
		Mockito.when(loanService.applyLoan(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(applyLoanResponse);
		MvcResult requestResult = mvc.perform(post("/loan/apply").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn();
		String result = requestResult.getResponse().getContentAsString();
		assertEquals(applyLoanResponse, result);
	}
}
