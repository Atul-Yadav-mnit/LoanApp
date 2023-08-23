package com.wellsfargo.loanapp.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDTO {
	
	private String employeeID;
	
	@NotNull(message="employee name can't be null")
	@Size(min=2, max=20, message="name must be betweeen 2 to 20 characters")
	private String employeeName;
	
	@NotNull(message="employee designation can't be null")
	private String designation;
	
	@NotNull(message="employee department can't be null")
	private String department;
	
	private Character gender;
	
	@Past(message="invalid date of birth")
	private LocalDate dateOfBirth;
	
	@PastOrPresent(message="date of joining can't be in future")
	private LocalDate dateOfJoining;
	
	@NotBlank(message = "password cannot be blank")
	private String password;

}
