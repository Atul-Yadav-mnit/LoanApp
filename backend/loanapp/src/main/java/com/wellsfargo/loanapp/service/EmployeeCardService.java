package com.wellsfargo.loanapp.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanapp.dao.EmployeeCardRepository;
import com.wellsfargo.loanapp.dao.EmployeeRepository;
import com.wellsfargo.loanapp.dao.LoanCardRepository;
import com.wellsfargo.loanapp.model.EmployeeCardDetails;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.utils.Utils;


@Service
public class EmployeeCardService {

	@Autowired
	private EmployeeCardRepository employeeCardRepository;
	
	@Autowired
	private LoanCardRepository loanCardRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;

	public EmployeeCardDetails addEmployeeCard(String employeeId, String loanCardId) {
		
		Optional<LoanCardMaster> loanCard = loanCardRepository.findById(loanCardId); 
		Optional<EmployeeMaster> employee = employeeRepository.findById(employeeId);
		
		if(loanCard.isPresent() && employee.isPresent())
		{
			EmployeeCardDetails employeeCardDetails = new EmployeeCardDetails(Utils.generateUniqueId(),employee.get(),loanCard.get(),new Date() );
			employeeCardRepository.save(employeeCardDetails);
			return employeeCardDetails;
		}
		else
		{
			return null;
		}
	}

	public List<EmployeeCardDetails> getAllEmployeeCard(String employeeId) {
		Optional<EmployeeMaster> employee = employeeRepository.findById(employeeId);
		return employeeCardRepository.findByEmployee(employee.get());
	}

}
