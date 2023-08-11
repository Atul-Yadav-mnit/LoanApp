package com.wellsfargo.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.Admin;
import com.wellsfargo.loanapp.service.AdminService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
	@Autowired
	AdminService adminService;
	
	@PostMapping("/admin/login")
	public String adminLogin(@RequestBody Admin adminLogin) {
		return adminService.validateAdmin(adminLogin);
	}
}
