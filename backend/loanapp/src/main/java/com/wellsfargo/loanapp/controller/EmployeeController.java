package com.wellsfargo.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.LoginModel;
import com.wellsfargo.loanapp.dto.EmployeeDTO;
import com.wellsfargo.loanapp.model.Admin;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.service.EmployeeService;

import jakarta.validation.Valid;



@RestController
@Validated
@CrossOrigin("http://localhost:3000")
@RequestMapping("/employee/")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/add")
	public ResponseEntity<EmployeeDTO> saveEmployee(@Valid @RequestBody EmployeeDTO employeeDto)
	{
		return employeeService.saveEmployee(employeeDto);
	}
	
	@PostMapping("/login")
	public ResponseEntity<EmployeeDTO> employeeLogin(@RequestBody LoginModel loginModel) {
		return employeeService.employeeLogin(loginModel);
	}
	
	@GetMapping("/{employeeId}")
	public ResponseEntity<EmployeeDTO> getEmployeeDetails(@RequestBody @PathVariable("employeeId") String employeeId ) {
		return employeeService.getEmployeeDetails(employeeId);
		
	}
	
	@PutMapping("/{employeeId}")
	public ResponseEntity<EmployeeDTO> updateEmployeeDetails(@RequestParam String userName, @PathVariable String employeeId,@RequestBody EmployeeDTO employeeDto) {
		return employeeService.updateEmployeeDetails(userName,employeeId,employeeDto);
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<EmployeeDTO>> getAllEmployeeDetails(@RequestParam String userName) {
		return employeeService.getAllEmployeeDetails(userName);
		
	}
	
	@DeleteMapping("{employeeId}")
	public ResponseEntity<EmployeeDTO> deleteEmployee(@RequestParam String userName, @PathVariable String employeeId) {
		return employeeService.deleteEmployee(userName,employeeId);
		
	}
	 
}
