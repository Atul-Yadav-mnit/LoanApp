package com.wellsfargo.loanapp.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	public EmployeeMaster saveEmployee(EmployeeMaster employee)
	{
		employee.employeeID = Utils.generateUniqueId();
		EmployeeMaster createdEmployee = employeeRepository.save(employee);
		return createdEmployee;
	}
	
public String employeeLogin(LoginModel loginModel) {
		
	Optional<EmployeeMaster> optionalEmployee = employeeRepository.findById(loginModel.employeeID);
	if (optionalEmployee.isPresent()) {
		EmployeeMaster employeeMaster= optionalEmployee.get();
		if (employeeMaster.getPassword().equals(loginModel.password)) {
			return "Logging in successful";
		} else {
			return "Invalid password";
		}
	}
	return "Invalid user";
	}
}
