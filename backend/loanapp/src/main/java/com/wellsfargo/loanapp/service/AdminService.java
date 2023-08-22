package com.wellsfargo.loanapp.service;

import org.springframework.http.ResponseEntity;

import com.wellsfargo.loanapp.dto.AdminDTO;

public interface AdminService {

	ResponseEntity<AdminDTO> validateAdmin(AdminDTO adminDto);

	boolean verfiyAdminUsername(String userName);

}
