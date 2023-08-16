package com.wellsfargo.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.ApplyLoanInputModel;
import com.wellsfargo.loanapp.service.LoanService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/loan")
public class LoanController {
	
	@Autowired
	private LoanService loanService;
	
	@PostMapping("/apply")
	public String applyLoan(@RequestBody ApplyLoanInputModel applyLoanInputModel)
	{
		String employeeId = applyLoanInputModel.getEmployeeId();
		String loanCardId = applyLoanInputModel.getLoanCardId();
		String itemId = applyLoanInputModel.getItemId();
		return loanService.applyLoan(employeeId, loanCardId, itemId);
	}

}
