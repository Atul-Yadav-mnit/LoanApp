package com.wellsfargo.loanapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class ItemMaster {
	
	@Id
	@Column(length = 6)
	private String itemId;
	
	@Column(length = 25)
	private String itemDescription;
	private char issueStatus;
	
	@Column(length = 25)
	private String itemMake;
	
	@Column(length = 20)
	private String itemCategory;
	
	@Column(length = 6)
	private int itemValuation;
	
	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getItemDescription() {
		return itemDescription;
	}

	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}

	public char getIssueStatus() {
		return issueStatus;
	}

	public void setIssueStatus(char issueStatus) {
		this.issueStatus = issueStatus;
	}

	public String getItemMake() {
		return itemMake;
	}

	public void setItemMake(String itemMake) {
		this.itemMake = itemMake;
	}

	public String getItemCategory() {
		return itemCategory;
	}

	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}

	public int getItemValuation() {
		return itemValuation;
	}

	public void setItemValuation(int itemValuation) {
		this.itemValuation = itemValuation;
	}

	public ItemMaster(String itemId, String itemDescription, char issueStatus, String itemMake, String itemCategory,
			int itemValuation) {
		super();
		this.itemId = itemId;
		this.itemDescription = itemDescription;
		this.issueStatus = issueStatus;
		this.itemMake = itemMake;
		this.itemCategory = itemCategory;
		this.itemValuation = itemValuation;
	}

	public ItemMaster() {
		super();
	}
	
	
}
