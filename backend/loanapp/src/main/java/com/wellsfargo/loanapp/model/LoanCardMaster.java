package com.wellsfargo.loanapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class LoanCardMaster {
	
	@Id
	@Column(length = 6)
	private String loanId;
	
	@Column(length = 15)
	@NotBlank(message="Loan Type can't be blank")
	private String loanType;
	
	@Column(length = 2)
	@Positive(message="duration must be strictly positive")
	private int durationOfYears;

	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	public int getDurationOfYears() {
		return durationOfYears;
	}

	public void setDurationOfYears(int durationOfYears) {
		this.durationOfYears = durationOfYears;
	}

	public LoanCardMaster(String loanId, String loanType, int durationOfYears) {
		super();
		this.loanId = loanId;
		this.loanType = loanType;
		this.durationOfYears = durationOfYears;
	}

	public LoanCardMaster() {
		super();
	}
	
}
