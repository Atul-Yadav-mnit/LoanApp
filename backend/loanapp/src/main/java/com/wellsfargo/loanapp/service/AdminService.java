package com.wellsfargo.loanapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanapp.dao.AdminRepository;
import com.wellsfargo.loanapp.model.Admin;

@Service
public class AdminService {
	@Autowired
	AdminRepository adminRepository;
	
	public String validateAdmin(Admin adminLogin) {
		Optional<Admin> optionalAdmin = adminRepository.findById(adminLogin.getUsername());
		if (optionalAdmin.isPresent()) {
			Admin admin = optionalAdmin.get();
			if (admin.getPassword().equals(adminLogin.getPassword())) {
				return "Logging in successful";
			} else {
				return "Invalid password";
			}
		}
		return "Invalid user";
	}
}
