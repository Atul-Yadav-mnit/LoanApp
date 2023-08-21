package com.wellsfargo.loanapp.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	public ResponseEntity<List<EmployeeCardDetails>> getAllEmployeeCard(String employeeId) {
		Optional<EmployeeMaster> employee = employeeRepository.findById(employeeId);
		if (employee.isEmpty()) {
			return ResponseGenerator.generateResponse(HttpStatus.BAD_REQUEST, "Invalid Employee ID", null);
		}
		List<EmployeeCardDetails> employeeCardList = employeeCardRepository.findByEmployee(employee.get());
		List<EmployeeCardDetails> filteredEmployeeCardList = employeeCardList.stream().filter(card -> {
			Date returnDate = Utils.addYearsToDate(card.getCardIssueDate(), card.getLoanCard().getDurationOfYears());
			return returnDate.after(new Date());
		}).toList();
		return ResponseGenerator.generateResponse(HttpStatus.OK,"", filteredEmployeeCardList);
	}

}
