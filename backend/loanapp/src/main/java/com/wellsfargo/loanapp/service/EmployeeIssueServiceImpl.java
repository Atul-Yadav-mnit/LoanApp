package com.wellsfargo.loanapp.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonCreator.Mode;
import com.wellsfargo.loanapp.dao.EmployeeCardRepository;
import com.wellsfargo.loanapp.dao.EmployeeIssueRepository;
import com.wellsfargo.loanapp.dao.EmployeeRepository;
import com.wellsfargo.loanapp.dao.ItemRepository;
import com.wellsfargo.loanapp.dao.LoanCardRepository;
import com.wellsfargo.loanapp.dto.EmployeeCardDTO;
import com.wellsfargo.loanapp.dto.EmployeeIssueDTO;
import com.wellsfargo.loanapp.model.EmployeeCardDetails;
import com.wellsfargo.loanapp.model.EmployeeIssueDetails;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.utils.Utils;

@Service
public class EmployeeIssueServiceImpl implements EmployeeIssueService{
		
		@Autowired
		private EmployeeIssueRepository employeeIssueRepository;
		
		@Autowired
		private ItemRepository itemRepository;
		
		@Autowired
		private EmployeeRepository employeeRepository;
		
		@Autowired
		private LoanCardRepository loanCardRepository;
		
		@Autowired
		private ModelMapper modelMapper;

		public EmployeeIssueDetails addEmployeeIssue(String employeeId, String itemId, String loanCardId) {
			
			Optional<ItemMaster> item = itemRepository.findById(itemId); 
			Optional<EmployeeMaster> employee = employeeRepository.findById(employeeId);
			Optional<LoanCardMaster> loanCard = loanCardRepository.findById(loanCardId);
			
			if(item.isPresent() && employee.isPresent() && loanCard.isPresent())
			{
				int numberOfYears = loanCard.get().getDurationOfYears();
				Date returnDate = Utils.addYearsToDate(new Date(), numberOfYears);
				EmployeeIssueDetails employeeIssueDetails = new EmployeeIssueDetails(Utils.generateUniqueId(),employee.get(),item.get(),new Date(),returnDate);
				employeeIssueRepository.save(employeeIssueDetails);
				return employeeIssueDetails;
			}
			else
			{
				return null;
			}
		}

		public ResponseEntity<List<EmployeeIssueDTO>> getAllEmployeeIssue(String employeeId) {
			Optional<EmployeeMaster> employee = employeeRepository.findById(employeeId);
			if (employee.isEmpty()) {
				return ResponseGenerator.generateResponse(HttpStatus.BAD_REQUEST, "Invalid Employee ID", null);
			}
			List<EmployeeIssueDetails> employeeIssueList = employeeIssueRepository.findByEmployee(employee.get());
			Date currentDate = new Date();
			List<EmployeeIssueDetails> filteredEmployeeIssueList = employeeIssueList.stream().filter(issue -> issue.getReturnDate().after(currentDate)).toList();
			List<EmployeeIssueDTO> filteredEmployeeIssueListDto = filteredEmployeeIssueList.stream().map(e -> modelMapper.map(e, EmployeeIssueDTO.class)).collect(Collectors.toList());
			String message = "";
			if(filteredEmployeeIssueListDto.size() == 0)
			{
				message = "No issues items present for employee "+employeeId+"!!!";
			}
			return ResponseGenerator.generateResponse(HttpStatus.OK,message, filteredEmployeeIssueListDto);
		}

	public void updateReturnDate(String itemCategory, Integer newDurationOfYears) {
		List<EmployeeIssueDetails> issuesToUpdate = employeeIssueRepository.findByItemCategory(itemCategory);
		for (EmployeeIssueDetails issue: issuesToUpdate) {
			Date oldReturnDate = issue.getReturnDate();
			Date currentDate = new Date();
			if (oldReturnDate.after(currentDate)) {
				Date newReturnDate = Utils.addYearsToDate(issue.getIssueDate(), newDurationOfYears);
				issue.setReturnDate(newReturnDate);
				employeeIssueRepository.save(issue);
			}
		}
	}
}
