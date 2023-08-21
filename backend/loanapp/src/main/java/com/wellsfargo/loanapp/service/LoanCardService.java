package com.wellsfargo.loanapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanapp.dao.LoanCardRepository;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.utils.Utils;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoanCardService {
	
	@Autowired
	LoanCardRepository loanCardRepository;
	
	@Autowired
	AdminService adminService;

	@Autowired
	EmployeeIssueService employeeIssueService;

	public ResponseEntity<List<LoanCardMaster>> getAllLoanCards()
	{
		List<LoanCardMaster> loanCardList = loanCardRepository.findAll();
		return ResponseGenerator.generateResponse(HttpStatus.OK, null, loanCardList);
	}

	public ResponseEntity<LoanCardMaster> saveLoanCard(String userName, LoanCardMaster loanCard) {
		if(adminService.verfiyAdminUsername(userName))
		{
			loanCard.setLoanId(Utils.generateUniqueId());
			loanCard = loanCardRepository.save(loanCard);
			return ResponseGenerator.generateResponse(HttpStatus.CREATED, "Loan Card created successfully !!!", loanCard);
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorized Access: Invalid Admin username !!!", null);
	}

	@Transactional
	public ResponseEntity<LoanCardMaster> updateLoanCard(String userName, String loanCardId, LoanCardMaster loanCard) {
		if(adminService.verfiyAdminUsername(userName))
		{
			Optional<LoanCardMaster> optionalLoanCard = loanCardRepository.findById(loanCardId);
			if (optionalLoanCard.isPresent()) {
				LoanCardMaster updatedLoanCard = optionalLoanCard.get();
				updatedLoanCard.setDurationOfYears(loanCard.getDurationOfYears());
				updatedLoanCard = loanCardRepository.save(updatedLoanCard);
				employeeIssueService.updateReturnDate(updatedLoanCard.getLoanType(), updatedLoanCard.getDurationOfYears());
				return ResponseGenerator.generateResponse(HttpStatus.OK, "Loan Card with Id "+loanCardId+" details Updated", updatedLoanCard);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Loan Card with Id " + loanCardId +" not found!!! ", null);
			}
		}
		return  ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorized Access: Invalid Admin username !!!", null);
	}

	public ResponseEntity<LoanCardMaster> deleteLoanCard(String userName, String loanCardId) {
		if(adminService.verfiyAdminUsername(userName))
		{
			Optional<LoanCardMaster> optionalLoanCard = loanCardRepository.findById(loanCardId);
			if (optionalLoanCard.isPresent()) {
				loanCardRepository.delete(optionalLoanCard.get());
				return ResponseGenerator.generateResponse(HttpStatus.OK, "Loan Card with Id "+loanCardId+" deleted successfully !!!", null);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Loan Card with Id " + loanCardId +" not found!!! ", null);
			}
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorized Access: Invalid Admin username !!!", null);
	}
}
