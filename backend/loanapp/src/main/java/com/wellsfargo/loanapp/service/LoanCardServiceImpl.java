package com.wellsfargo.loanapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanapp.dao.LoanCardRepository;
import com.wellsfargo.loanapp.dto.ItemDTO;
import com.wellsfargo.loanapp.dto.LoanCardDTO;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.utils.Utils;

import ch.qos.logback.core.model.Model;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

@Service
public class LoanCardServiceImpl implements LoanCardService{
	
	@Autowired
	LoanCardRepository loanCardRepository;
	
	@Autowired
	AdminService adminService;

	@Autowired
	EmployeeIssueService employeeIssueService;
	
	@Autowired
	ModelMapper modelMapper;

	public ResponseEntity<List<LoanCardDTO>> getAllLoanCards()
	{
		List<LoanCardMaster> loanCardList = loanCardRepository.findAll();
		List<LoanCardDTO> loanCardDTOList = loanCardList.stream().map(e -> modelMapper.map(e, LoanCardDTO.class)).collect(Collectors.toList());
		String message = "";
		if(loanCardDTOList.size() == 0)
		{
			message = "No loanCard present !!!";
		}
		return ResponseGenerator.generateResponse(HttpStatus.OK, message, loanCardDTOList);
	}

	public ResponseEntity<LoanCardDTO> saveLoanCard(UserDetails userDetails, LoanCardDTO loanCardDto) {
		if(adminService.verifyAdmin(userDetails))
		{
			loanCardDto.setLoanId(Utils.generateUniqueId());
			LoanCardMaster loanCard = modelMapper.map(loanCardDto, LoanCardMaster.class);
			LoanCardMaster createdLoanCard = loanCardRepository.save(loanCard);
			LoanCardDTO createdLoanCardDto = modelMapper.map(createdLoanCard, LoanCardDTO.class);
			return ResponseGenerator.generateResponse(HttpStatus.CREATED, "Loan Card created successfully", createdLoanCardDto);
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorized Access: Invalid Admin username", null);
	}

	@Transactional
	public ResponseEntity<LoanCardDTO> updateLoanCard(UserDetails userDetails, String loanCardId, LoanCardDTO loanCardDto) {
		if(adminService.verifyAdmin(userDetails))
		{
			Optional<LoanCardMaster> optionalLoanCard = loanCardRepository.findById(loanCardId);
			if (optionalLoanCard.isPresent()) {
				LoanCardMaster updatedLoanCard = optionalLoanCard.get();
				updatedLoanCard.setDurationOfYears(loanCardDto.getDurationOfYears());
				updatedLoanCard = loanCardRepository.save(updatedLoanCard);

				employeeIssueService.updateReturnDate(updatedLoanCard.getLoanType(), updatedLoanCard.getDurationOfYears());
				
				
				
				
				LoanCardDTO updatedLoanCardDto = modelMapper.map(updatedLoanCard, LoanCardDTO.class);
				return ResponseGenerator.generateResponse(HttpStatus.OK, "Loan Card with Id "+loanCardId+" details Updated", updatedLoanCardDto);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Loan Card with Id " + loanCardId +" not found", null);
			}
		}
		return  ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorized Access: Invalid Admin username", null);
	}

	public ResponseEntity<LoanCardDTO> deleteLoanCard(UserDetails userDetails, String loanCardId) {
		if(adminService.verifyAdmin(userDetails))
		{
			Optional<LoanCardMaster> optionalLoanCard = loanCardRepository.findById(loanCardId);
			if (optionalLoanCard.isPresent()) {
				loanCardRepository.delete(optionalLoanCard.get());
				return ResponseGenerator.generateResponse(HttpStatus.OK, "Loan Card with Id "+loanCardId+" deleted successfully", null);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND, "Loan Card with Id " + loanCardId +" not found", null);
			}
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorized Access: Invalid Admin username", null);
	}
}
