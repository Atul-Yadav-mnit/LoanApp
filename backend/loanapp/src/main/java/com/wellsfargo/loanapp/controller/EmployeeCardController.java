package com.wellsfargo.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.dto.EmployeeCardDTO;
import com.wellsfargo.loanapp.model.EmployeeCardDetails;
import com.wellsfargo.loanapp.service.EmployeeCardService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/employeeCard")
public class EmployeeCardController {
	
	@Autowired
	private EmployeeCardService employeeCardService;
	
//	@PostMapping("/add")
//	public EmployeeCardDetails addEmployeeCard(String employeeId, String loanCardId)
//	{
//		return employeeCardService.addEmployeeCard(employeeId,loanCardId);
//	}
	
	@GetMapping("/{employeeId}/all")
	public ResponseEntity<List<EmployeeCardDTO>> getAllEmployeeCard(@PathVariable("employeeId") String employeeId)
	{
		return employeeCardService.getAllEmployeeCard(employeeId);
	}
}
