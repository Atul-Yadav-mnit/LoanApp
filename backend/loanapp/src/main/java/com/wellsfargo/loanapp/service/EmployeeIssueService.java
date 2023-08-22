package com.wellsfargo.loanapp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.wellsfargo.loanapp.dto.EmployeeIssueDTO;
import com.wellsfargo.loanapp.model.EmployeeIssueDetails;

public interface EmployeeIssueService {

	ResponseEntity<List<EmployeeIssueDTO>> getAllEmployeeIssue(String employeeId);

	EmployeeIssueDetails addEmployeeIssue(String employeeId, String itemId, String loanCardId);

}
