package com.wellsfargo.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.EmployeeCardDetails;
import com.wellsfargo.loanapp.service.EmployeeCardService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/employeeCard")
public class EmployeeCardController {
	
	@Autowired
	private EmployeeCardService employeeCardService;
	
	@PostMapping("/add")
	public EmployeeCardDetails addEmployeeCard(String employeeId, String loanCardId)
	{
		return employeeCardService.addEmployeeCard(employeeId,loanCardId);
	}
}
