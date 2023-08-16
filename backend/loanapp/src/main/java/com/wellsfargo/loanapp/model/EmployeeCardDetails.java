package com.wellsfargo.loanapp.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class EmployeeCardDetails {
	
	@Id
	private String employeeCardId;
	
	@ManyToOne(
			cascade = CascadeType.ALL,
			fetch = FetchType.EAGER
	)
	@JoinColumn(
			name = "employee_id",
			referencedColumnName = "employeeId"
	)
	private EmployeeMaster employee;
	
	@ManyToOne(
			cascade = CascadeType.ALL,
			fetch = FetchType.EAGER
	)
	@JoinColumn(
			name = "loan_id",
			referencedColumnName = "loanId"
	)
	private LoanCardMaster loanCard;

	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date cardIssueDate;

	
	public String getEmployeeCardId() {
		return employeeCardId;
	}

	public void setEmployeeCardId(String employeeCardId) {
		this.employeeCardId = employeeCardId;
	}

	public EmployeeMaster getEmployee() {
		return employee;
	}

	public void setEmployee(EmployeeMaster employee) {
		this.employee = employee;
	}

	public LoanCardMaster getLoanCard() {
		return loanCard;
	}

	public void setLoanCard(LoanCardMaster loanCard) {
		this.loanCard = loanCard;
	}

	public Date getCardIssueDate() {
		return cardIssueDate;
	}

	public void setCardIssueDate(Date cardIssueDate) {
		this.cardIssueDate = cardIssueDate;
	}

	
	

	public EmployeeCardDetails(String employeeCardId, EmployeeMaster employee, LoanCardMaster loanCard,
			Date cardIssueDate) {
		super();
		this.employeeCardId = employeeCardId;
		this.employee = employee;
		this.loanCard = loanCard;
		this.cardIssueDate = cardIssueDate;
	}

	public EmployeeCardDetails() {
		super();
	}
	
	
}
