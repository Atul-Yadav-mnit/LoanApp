package com.wellsfargo.loanapp.service;

import java.lang.ModuleLayer.Controller;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import com.wellsfargo.loanapp.dao.EmployeeRepository;
import com.wellsfargo.loanapp.dto.EmployeeDTO;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.LoginModel;
import com.wellsfargo.loanapp.utils.Utils;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	AdminService adminService;

	public ResponseEntity<EmployeeDTO> saveEmployee(EmployeeDTO employeeDto)
	{
		employeeDto.setEmployeeID(Utils.generateUniqueId());
		EmployeeMaster employee = modelMapper.map(employeeDto, EmployeeMaster.class);
		EmployeeMaster createdEmployee = employeeRepository.save(employee);
		EmployeeDTO createdEmployeeDto = modelMapper.map(createdEmployee, EmployeeDTO.class);
		return ResponseGenerator.generateResponse(HttpStatus.CREATED, "Employee created successfully", createdEmployeeDto);
	}

public ResponseEntity<EmployeeDTO> employeeLogin(LoginModel loginModel) {

	Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(loginModel.employeeID);
	if (optionalEmployee.isPresent()) {
		EmployeeMaster employeeMaster= optionalEmployee.get();
		if (employeeMaster.getPassword().equals(loginModel.password)) {
			EmployeeDTO employeeDto = modelMapper.map(employeeMaster, EmployeeDTO.class);
			return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee login successful", employeeDto);
		} else {
			return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Employee login failed : Invalid Password", null);
		}
	}
	return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Employee login failed : Invalid User", null);
	}

public ResponseEntity<EmployeeDTO> getEmployeeDetails(String employeeId) {
	// TODO Auto-generated method stub
	Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(employeeId);
	System.out.println(optionalEmployee.get());
	if (optionalEmployee.isPresent()) {
		EmployeeMaster employeeMaster= optionalEmployee.get();
		EmployeeDTO employeeDto = modelMapper.map(employeeMaster, EmployeeDTO.class);
		return ResponseGenerator.generateResponse(HttpStatus.OK, "", employeeDto);
	} else {
		return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Employee with "+employeeId+" not found ", null);
	}
}

public ResponseEntity<EmployeeDTO> updateEmployeeDetails(UserDetails userDetails, String employeeId, EmployeeDTO employeeDto) {

	if(adminService.verifyAdmin(userDetails))
	{
		Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(employeeId);
		if (optionalEmployee.isPresent()) {
			EmployeeMaster updatedEmployee = optionalEmployee.get();
			updatedEmployee.setDateOfBirth(employeeDto.getDateOfBirth());
			updatedEmployee.setDateOfJoining(employeeDto.getDateOfJoining());
			updatedEmployee.setDepartment(employeeDto.getDepartment());
			updatedEmployee.setDesignation(employeeDto.getDesignation());
			updatedEmployee.setEmployeeName(employeeDto.getEmployeeName());
			updatedEmployee.setGender(employeeDto.getGender());
			updatedEmployee  = employeeRepository.save(updatedEmployee);
			EmployeeDTO updatedEmployeeDto = modelMapper.map(updatedEmployee, EmployeeDTO.class);
			return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee Details Updated", updatedEmployeeDto);
		} else {
		    return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Employee with " + employeeId +" not found ", null);
		}
	}
	return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED,"Access Denied: Admin level access only", null);
}

public ResponseEntity<List<EmployeeDTO>> getAllEmployeeDetails(UserDetails userDetails) {
	if(adminService.verifyAdmin(userDetails))
	{
		List<EmployeeMaster> employees = employeeRepository.findAll();
		List<EmployeeDTO> employeesDTO = employees.stream().map(e -> modelMapper.map(e, EmployeeDTO.class)).collect(Collectors.toList());
		String message = "";
		if(employeesDTO.size() == 0)
		{
			message = "No employee present !!!";
		}
		return ResponseGenerator.generateResponse(HttpStatus.OK,message, employeesDTO);
	}
	return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED,"Access Denied: Admin level access only", null);
}

public ResponseEntity<EmployeeDTO> deleteEmployee(UserDetails userDetails, String employeeId) {
	if(adminService.verifyAdmin(userDetails))
	{
		Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(employeeId);
		if (optionalEmployee.isPresent()) {
			employeeRepository.delete(optionalEmployee.get());
			return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee with Id "+  employeeId +"Deleted Successfully ", null);
		} else {
			return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Employee with " + employeeId +" not found ", null);
		}
	}
	return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED,"Access Denied: Admin level access only", null);
}

}