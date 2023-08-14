package com.wellsfargo.loanapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.loanapp.model.EmployeeCardDetails;

@Repository
public interface EmployeeCardRepository extends JpaRepository<EmployeeCardDetails, String> {

}
