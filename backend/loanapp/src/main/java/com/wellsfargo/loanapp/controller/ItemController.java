package com.wellsfargo.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.model.LoanCardMaster;
import com.wellsfargo.loanapp.service.ItemService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/item")
public class ItemController {
	
	@Autowired
	public ItemService itemService;
	
	@GetMapping("/all")
	public List<ItemMaster> getAllItems()
	{
		return itemService.getAllItems();
	}
	
	@PostMapping("/add")
	public ItemMaster saveItem(@RequestBody ItemMaster item)
	{
	
		ItemMaster createdItem = itemService.saveItem(item);
		return createdItem;
	}
	

}
