package com.wellsfargo.loanapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.loanapp.model.EmployeeIssueDetails;
import com.wellsfargo.loanapp.model.EmployeeMaster;

@Repository
public interface EmployeeIssueRepository extends JpaRepository<EmployeeIssueDetails, String> {

	List<EmployeeIssueDetails> findByEmployee(EmployeeMaster employeeMaster);

}
