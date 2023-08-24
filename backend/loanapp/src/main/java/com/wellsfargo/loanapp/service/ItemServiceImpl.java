package com.wellsfargo.loanapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wellsfargo.loanapp.dao.ItemRepository;
import com.wellsfargo.loanapp.dto.EmployeeDTO;
import com.wellsfargo.loanapp.dto.ItemDTO;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.utils.Utils;

@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	AdminService adminService;
	
	@Autowired
	ModelMapper modelMapper;

	public ResponseEntity<List<ItemDTO>> getAllItems()
	{
		List<ItemMaster> items = itemRepository.findAll();
		List<ItemDTO> itemsDTO = items.stream().map(e -> modelMapper.map(e, ItemDTO.class)).collect(Collectors.toList());
		return ResponseGenerator.generateResponse(HttpStatus.OK, null, itemsDTO);
	}

	public ResponseEntity<ItemDTO> saveItem(String userName, ItemDTO itemDto) {
		if(adminService.verfiyAdminUsername(userName))
		{
			itemDto.setItemId(Utils.generateUniqueId());
			ItemMaster item = modelMapper.map(itemDto, ItemMaster.class);
			ItemMaster createdItem = itemRepository.save(item);
			ItemDTO createdItemDto = modelMapper.map(createdItem, ItemDTO.class);
			return  ResponseGenerator.generateResponse(HttpStatus.CREATED, "Item added successfully", createdItemDto);        
		}
		return  ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorised access: Invalid Admin Username", null);        
	}

	public ResponseEntity<ItemDTO> updateItem(String userName, String itemId, ItemDTO itemDto) {
		if(adminService.verfiyAdminUsername(userName))
		{
			Optional<ItemMaster> optionalItem = itemRepository.findById(itemId);
			if (optionalItem.isPresent()) {
				ItemMaster updatedItem = optionalItem.get();
				updatedItem.setIssueStatus(itemDto.getIssueStatus());
				updatedItem.setItemDescription(itemDto.getItemDescription());
				updatedItem.setItemValuation(itemDto.getItemValuation());
				updatedItem = itemRepository.save(updatedItem);
				ItemDTO updatedItemDto = modelMapper.map(updatedItem, ItemDTO.class);
				return ResponseGenerator.generateResponse(HttpStatus.OK,"Item with Id "+itemId+" details Updated",updatedItemDto);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND,"Item with Id " + itemId +" not found", null);
			}
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorised access: Invalid Admin Username", null);  
	}

	public ResponseEntity<ItemDTO> deleteItem(String userName, String itemId) {
		if(adminService.verfiyAdminUsername(userName))
		{
			Optional<ItemMaster> optionalItem = itemRepository.findById(itemId);
			if (optionalItem.isPresent()) {
				itemRepository.delete(optionalItem.get());
				return ResponseGenerator.generateResponse(HttpStatus.OK,"Item with Id "+itemId+" deleted successfully",null);
			} else {
				return ResponseGenerator.generateResponse(HttpStatus.NOT_FOUND,"Item with Id " + itemId +" not found", null);
			}
		}
		return ResponseGenerator.generateResponse(HttpStatus.UNAUTHORIZED, "Unauthorised access: Invalid Admin Username", null);  
	}
	

}
