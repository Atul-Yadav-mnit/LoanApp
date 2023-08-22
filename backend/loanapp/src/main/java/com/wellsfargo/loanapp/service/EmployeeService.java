package com.wellsfargo.loanapp.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.wellsfargo.loanapp.dao.EmployeeRepository;
import com.wellsfargo.loanapp.model.Admin;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.LoginModel;
import com.wellsfargo.loanapp.utils.Utils;

@Service
public class EmployeeService {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	AdminService adminService;
	
	public ResponseEntity<EmployeeMaster> saveEmployee(EmployeeMaster employee)
	{
		employee.setEmployeeID(Utils.generateUniqueId());
		EmployeeMaster createdEmployee = employeeRepository.save(employee);
		return ResponseGenerator.generateResponse(HttpStatus.CREATED, "Employee created successfully !!!", createdEmployee);
	}
	
public ResponseEntity<EmployeeMaster> employeeLogin(LoginModel loginModel) {
		
	Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(loginModel.employeeID);
	if (optionalEmployee.isPresent()) {
		EmployeeMaster employeeMaster= optionalEmployee.get();
		if (employeeMaster.getPassword().equals(loginModel.password)) {
			return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee login successfull !!!", employeeMaster);
		} else {
			return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee login failed : Invalid Password !!!", null);
		}
	}
	return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee login failed : Invalid User !!!", null);
	}

public ResponseEntity<EmployeeMaster> getEmployeeDetails(String employeeId) {
	// TODO Auto-generated method stub
	Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(employeeId);
	if (optionalEmployee.isPresent()) {
		EmployeeMaster employeeMaster= optionalEmployee.get();
		return ResponseGenerator.generateResponse(HttpStatus.OK, "", employeeMaster);
	} else {
		return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Employee with "+employeeId+" not found !!!", null);
	}
}

public ResponseEntity<EmployeeMaster> updateEmployeeDetails(String userName, String employeeId, EmployeeMaster employee) {
	
	if(adminService.verfiyAdminUsername(userName))
	{
		Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(employeeId);
		if (optionalEmployee.isPresent()) {
			EmployeeMaster updatedEmployee = optionalEmployee.get();
			updatedEmployee.setDateOfBirth(employee.getDateOfBirth());
			updatedEmployee.setDateOfJoining(employee.getDateOfJoining());
			updatedEmployee.setDepartment(employee.getDepartment());
			updatedEmployee.setDesignation(employee.getDesignation());
			updatedEmployee.setEmployeeName(employee.getEmployeeName());
			updatedEmployee.setGender(employee.getGender());
			updatedEmployee  = employeeRepository.save(updatedEmployee);
			return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee Details Updated", updatedEmployee);
		} else {
		    return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Employee with " + employeeId +" not found!!! ", null);
		}
	}
	return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED,"Access Denied: Admin level access only!!!", null);
}

public ResponseEntity<List<EmployeeMaster>> getAllEmployeeDetails(String userName) {
	if(adminService.verfiyAdminUsername(userName))
	{
		List<EmployeeMaster> employees = employeeRepository.findAll();
		return ResponseGenerator.generateResponse(HttpStatus.OK,"", employees);
	}
	return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED,"Access Denied: Admin level access only!!!", null);
}

public ResponseEntity<EmployeeMaster> deleteEmployee(String userName, String employeeId) {
	if(adminService.verfiyAdminUsername(userName))
	{
		Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(employeeId);
		if (optionalEmployee.isPresent()) {
			employeeRepository.delete(optionalEmployee.get());
			return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee with Id "+  employeeId +"Deleted Successfully !!!", null);
		} else {
			return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Employee with " + employeeId +" not found!!! ", null);
		}
	}
	return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED,"Access Denied: Admin level access only!!!", null);
}

}
