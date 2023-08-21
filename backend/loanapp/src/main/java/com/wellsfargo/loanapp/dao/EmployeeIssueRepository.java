package com.wellsfargo.loanapp.dao;

import java.util.List;

import com.wellsfargo.loanapp.model.ItemMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wellsfargo.loanapp.model.EmployeeIssueDetails;
import com.wellsfargo.loanapp.model.EmployeeMaster;

@Repository
public interface EmployeeIssueRepository extends JpaRepository<EmployeeIssueDetails, String> {

	List<EmployeeIssueDetails> findByEmployee(EmployeeMaster employeeMaster);

	@Query("SELECT employee_issue from EmployeeIssueDetails employee_issue WHERE employee_issue.item.itemCategory = ?1")
	List<EmployeeIssueDetails> findByItemCategory(String itemCategory);

}
