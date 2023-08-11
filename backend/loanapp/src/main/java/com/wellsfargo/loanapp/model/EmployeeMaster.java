package com.wellsfargo.loanapp.model;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class EmployeeMaster {
	

	@Id
	@Column(length = 6)
//	@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
	public String employeeID;
	
	@Column(length = 20)
	private String employeeName;
	
	@Column(length = 25)
	private String designation;
	
	@Column(length = 25)
	private String department;
	
	@Column()
	private Character gender;
	
	@Column()
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private LocalDate dateOfBirth;
	
	@Column()
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private LocalDate dateOfJoining;
	
	@Column()
	private String password;

	public String getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeID = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Character getGender() {
		return gender;
	}

	public void setGender(Character gender) {
		this.gender = gender;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public LocalDate getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(LocalDate dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	

	public EmployeeMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeMaster(String employeeId, String employeeName, String designation, String department,
			Character gender, LocalDate dateOfBirth, LocalDate dateOfJoining, String password) {
		super();
		this.employeeID = employeeId;
		this.employeeName = employeeName;
		this.designation = designation;
		this.department = department;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.dateOfJoining = dateOfJoining;
		this.password = password;
	}
	
	
	
	

}
