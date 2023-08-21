package com.wellsfargo.loanapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanapp.dao.ItemRepository;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.utils.Utils;

@Service
public class ItemService {

	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	AdminService adminService;

	public ResponseEntity<List<ItemMaster>> getAllItems()
	{
		List<ItemMaster> items = itemRepository.findAll();
		return ResponseGenerator.generateResponse(HttpStatus.OK, null, items);
	}

	public ResponseEntity<ItemMaster> saveItem(String userName, ItemMaster item) {
		if(adminService.verfiyAdminUsername(userName))
		{
			item.setItemId(Utils.generateUniqueId());
			return  ResponseGenerator.generateResponse(HttpStatus.CREATED, "Item added successfully", itemRepository.save(item));        
		}
		return  ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorised access: Invalid Admin Username", null);        
	}

	public ResponseEntity<ItemMaster> updateItem(String userName, String itemId, ItemMaster item) {
		if(adminService.verfiyAdminUsername(userName))
		{
			Optional<ItemMaster> optionalItem = itemRepository.findById(itemId);
			if (optionalItem.isPresent()) {
				ItemMaster updatedItem = optionalItem.get();
				updatedItem.setIssueStatus(item.getIssueStatus());
				updatedItem.setItemDescription(item.getItemDescription());
				updatedItem.setItemValuation(item.getItemValuation());
				updatedItem = itemRepository.save(updatedItem);
				return ResponseGenerator.generateResponse(HttpStatus.OK,"Item with Id "+itemId+" details Updated",updatedItem);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND,"Item with Id " + itemId +" not found!!! ", null);
			}
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorised access: Invalid Admin Username", null);  
	}

	public ResponseEntity<ItemMaster> deleteItem(String userName, String itemId) {
		if(adminService.verfiyAdminUsername(userName))
		{
			Optional<ItemMaster> optionalItem = itemRepository.findById(itemId);
			if (optionalItem.isPresent()) {
				itemRepository.delete(optionalItem.get());
				return ResponseGenerator.generateResponse(HttpStatus.OK,"Item with Id "+itemId+" deleted successfully",null);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND,"Item with Id " + itemId +" not found!!! ", null);
			}
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorised access: Invalid Admin Username", null);  
	}
	

}
