package com.wellsfargo.loanapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.loanapp.model.EmployeeMaster;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeMaster,String>{
	
}
