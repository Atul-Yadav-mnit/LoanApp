package com.wellsfargo.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.LoginModel;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.service.EmployeeService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/employee/")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/add")
	public String saveEmployee(@RequestBody EmployeeMaster employee)
	{
	
		EmployeeMaster createdEmployee = employeeService.saveEmployee(employee);
		return "Created user with employeeID: " + createdEmployee.getEmployeeID();
	}
	
	@PostMapping("/login")
	public String login(@RequestBody LoginModel loginModel) {
		return employeeService.employeeLogin(loginModel);
	}
}
