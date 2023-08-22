package com.wellsfargo.loanapp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.wellsfargo.loanapp.dto.EmployeeCardDTO;
import com.wellsfargo.loanapp.model.EmployeeCardDetails;

public interface EmployeeCardService {

	ResponseEntity<List<EmployeeCardDTO>> getAllEmployeeCard(String employeeId);

	EmployeeCardDetails addEmployeeCard(String employeeId, String loanCardId);

}
