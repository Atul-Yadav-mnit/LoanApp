package com.wellsfargo.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.dto.LoanCardDTO;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.service.LoanCardService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/loanCard")
public class LoanCardController {
	
	@Autowired
	public LoanCardService loanCardService;
	
	@GetMapping("/all")
	public ResponseEntity<List<LoanCardDTO>> getAllLoanCards()
	{
		return loanCardService.getAllLoanCards();
	}
	
	@PostMapping("/add")
	public ResponseEntity<LoanCardDTO> saveLoanCard(@RequestParam String userName, @RequestBody LoanCardDTO loanCardDto)
	{
	
		return loanCardService.saveLoanCard(userName,loanCardDto);
	}
	
	@PutMapping("/{loanCardId}")
	public ResponseEntity<LoanCardDTO> updateLoanCard(@RequestParam String userName, @PathVariable String loanCardId,@RequestBody LoanCardDTO loanCardDto) {
		return loanCardService.updateLoanCard(userName,loanCardId,loanCardDto);
		
	}

	@DeleteMapping("/{loanCardId}")
	public ResponseEntity<LoanCardDTO> deleteLoanCard(@RequestParam String userName, @PathVariable String loanCardId) {
		return loanCardService.deleteLoanCard(userName,loanCardId);
		
	}

}
