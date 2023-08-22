package com.wellsfargo.loanapp.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ApplyLoanInputModel {
	
	@NotNull(message="Employee Id can't be empty")
	public String employeeId;
	
	@NotBlank(message="Loan Card id can't be empty")
	public String loanCardId;
	
	@NotNull(message="Item Id can't be empty")
	public String itemId;
	
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getLoanCardId() {
		return loanCardId;
	}
	public void setLoanCardId(String loanCardId) {
		this.loanCardId = loanCardId;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}
	
	
}
