package com.wellsfargo.loanapp.service;

import org.springframework.http.ResponseEntity;

public interface LoanService {

	ResponseEntity<String> applyLoan(String employeeId, String loanCardId, String itemId);

}
