package com.wellsfargo.loanapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.loanapp.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, String> {

}
