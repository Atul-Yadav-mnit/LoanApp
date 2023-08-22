package com.wellsfargo.loanapp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.wellsfargo.loanapp.dto.LoanCardDTO;

public interface LoanCardService {

	ResponseEntity<List<LoanCardDTO>> getAllLoanCards();

	ResponseEntity<LoanCardDTO> saveLoanCard(String userName, LoanCardDTO loanCardDto);

	ResponseEntity<LoanCardDTO> updateLoanCard(String userName, String loanCardId, LoanCardDTO loanCardDto);

	ResponseEntity<LoanCardDTO> deleteLoanCard(String userName, String loanCardId);

}
