package com.wellsfargo.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.service.LoanCardService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/loanCard")
public class LoanCardController {
	
	@Autowired
	public LoanCardService loanCardService;
	
	@GetMapping("/all")
	public List<LoanCardMaster> getAllLoanCards()
	{
		return loanCardService.getAllLoanCards();
	}
	
	@PostMapping("/add")
	public LoanCardMaster saveLoanCard(@RequestBody LoanCardMaster loanCard)
	{
	
		LoanCardMaster createdLoanCard = loanCardService.saveLoanCard(loanCard);
		return createdLoanCard;
	}

}
