package com.wellsfargo.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.dto.AdminDTO;
import com.wellsfargo.loanapp.model.Admin;
import com.wellsfargo.loanapp.service.AdminService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	AdminService adminService;
	
	@PostMapping("/login")
	public ResponseEntity<AdminDTO> adminLogin(@RequestBody AdminDTO adminDto) {
		return adminService.validateAdmin(adminDto);
	}
}
