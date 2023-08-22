package com.wellsfargo.loanapp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.wellsfargo.loanapp.dto.EmployeeDTO;
import com.wellsfargo.loanapp.model.LoginModel;

public interface EmployeeService {

	ResponseEntity<EmployeeDTO> saveEmployee(EmployeeDTO employeeDto);

	ResponseEntity<EmployeeDTO> employeeLogin(LoginModel loginModel);

	ResponseEntity<EmployeeDTO> getEmployeeDetails(String employeeId);

	ResponseEntity<EmployeeDTO> updateEmployeeDetails(String userName, String employeeId, EmployeeDTO employeeDto);

	ResponseEntity<List<EmployeeDTO>> getAllEmployeeDetails(String userName);

	ResponseEntity<EmployeeDTO> deleteEmployee(String userName, String employeeId);

}