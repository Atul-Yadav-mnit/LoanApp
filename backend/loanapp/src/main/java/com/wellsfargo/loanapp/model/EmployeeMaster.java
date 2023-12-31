package com.wellsfargo.loanapp.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import com.wellsfargo.loanapp.utils.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EmployeeMaster implements UserDetails {
	

	@Id
	@Column(length = 6)
	private String employeeID;
	
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

	private String password;


	@JsonIgnore
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	private List<EmployeeCardDetails> employeeCards = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	private List<EmployeeIssueDetails> employeeIssues = new ArrayList<>();
  
	private Role role;

	@Override
	public String toString() {
		return "EmployeeMaster{" +
				"employeeID='" + employeeID + '\'' +
				", employeeName='" + employeeName + '\'' +
				", designation='" + designation + '\'' +
				", department='" + department + '\'' +
				", gender=" + gender +
				", dateOfBirth=" + (dateOfBirth != null ? dateOfBirth.toString() : "null") +
				", dateOfJoining=" + (dateOfJoining != null ? dateOfJoining.toString() : "null") +
				", password='" + password + '\'' +
				", role=" + role +
				'}';
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return employeeID;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
  
}
