package com.wellsfargo.loanapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Admin {
	@Id
	@Column(length=25)
	@NotBlank(message="Admin username can't be blank")
	@Size(min=5, max=25, message="Admin username must be between 5-25 words")
	private String username;
	
	@Column(length=25)
	@NotBlank(message="password can't be blank")
	@Size(min=4, max=25, message="Password must exceed 4 characters")
	private String password;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
