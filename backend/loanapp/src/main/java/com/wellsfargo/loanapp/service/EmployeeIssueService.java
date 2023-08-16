package com.wellsfargo.loanapp.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanapp.dao.EmployeeCardRepository;
import com.wellsfargo.loanapp.dao.EmployeeIssueRepository;
import com.wellsfargo.loanapp.dao.EmployeeRepository;
import com.wellsfargo.loanapp.dao.ItemRepository;
import com.wellsfargo.loanapp.dao.LoanCardRepository;
import com.wellsfargo.loanapp.model.EmployeeCardDetails;
import com.wellsfargo.loanapp.model.EmployeeIssueDetails;
import com.wellsfargo.loanapp.model.EmployeeMaster;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.utils.Utils;

@Service
public class EmployeeIssueService {
		
		@Autowired
		private EmployeeIssueRepository employeeIssueRepository;
		
		@Autowired
		private ItemRepository itemRepository;
		
		@Autowired
		private EmployeeRepository employeeRepository;

		public EmployeeIssueDetails addEmployeeIssue(String employeeId, String itemId) {
			
			Optional<ItemMaster> item = itemRepository.findById(itemId); 
			Optional<EmployeeMaster> employee = employeeRepository.findById(employeeId);
			
			if(item.isPresent() && employee.isPresent())
			{
				EmployeeIssueDetails employeeIssueDetails = new EmployeeIssueDetails(Utils.generateUniqueId(),employee.get(),item.get(),new Date(),null);
				employeeIssueRepository.save(employeeIssueDetails);
				return employeeIssueDetails;
			}
			else
			{
				return null;
			}
		}

		public List<EmployeeIssueDetails> getAllEmployeeIssue(String employeeId) {
			Optional<EmployeeMaster> employee = employeeRepository.findById(employeeId);
			return employeeIssueRepository.findByEmployee(employee.get());
		}
}
