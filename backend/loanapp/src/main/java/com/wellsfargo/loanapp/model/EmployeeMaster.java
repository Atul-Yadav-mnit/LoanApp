package com.wellsfargo.loanapp.model;

import java.time.LocalDate;

//import org.antlr.v4.runtime.misc.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

@Entity
public class EmployeeMaster {
	

	@Id
	@Column(length = 6)
//	@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
	public String employeeID;
	
	@Column(length = 20)
	@NotNull(message="employee name can't be null")
	@Size(min=2, max=20, message="name must be betweeen 2 to 20 characters")
	private String employeeName;
	
	@Column(length = 25)
	@NotNull(message="employee designation can't be null")
	private String designation;
	
	@Column(length = 25)
	@NotNull(message="employee department can't be null")
	private String department;
	
	@Column()
	private Character gender;
	
	@Column()
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	@Past(message="invalid date of birth")
	private LocalDate dateOfBirth;
	
	@Column()
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	@PastOrPresent(message="date of joining can't be in future")
	private LocalDate dateOfJoining;
	
	@Column()
	@NotBlank(message = "password cannot be blank")
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
