package com.wellsfargo.loanapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.loanapp.model.LoanCardMaster;

@Repository
public interface LoanCardRepository extends JpaRepository<LoanCardMaster,String>{

}
