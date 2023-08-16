package com.wellsfargo.loanapp.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class EmployeeIssueDetails{
	
	@Id
	@Column
	private String issueId;
	
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
			name = "item_id",
			referencedColumnName = "itemId"
	)
	private ItemMaster item;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date issueDate;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date returnDate;

	public String getIssueId() {
		return issueId;
	}

	public void setIssueId(String issueId) {
		this.issueId = issueId;
	}

	public EmployeeMaster getEmployee() {
		return employee;
	}

	public void setEmployee(EmployeeMaster employee) {
		this.employee = employee;
	}

	public ItemMaster getItem() {
		return item;
	}

	public void setItem(ItemMaster item) {
		this.item = item;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public EmployeeIssueDetails(String issueId, EmployeeMaster employee, ItemMaster item, Date issueDate,
			Date returnDate) {
		super();
		this.issueId = issueId;
		this.employee = employee;
		this.item = item;
		this.issueDate = issueDate;
		this.returnDate = returnDate;
	}

	public EmployeeIssueDetails() {
		super();
	}
	
	
	
}
