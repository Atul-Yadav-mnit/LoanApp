package com.wellsfargo.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.service.EmployeeService;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/saveEmployee")
	public EmployeeMaster saveEmployee(@RequestBody EmployeeMaster employee)
	{
		EmployeeMaster createdEmployee = employeeService.saveEmployee(employee);
		return createdEmployee;
	}
}
