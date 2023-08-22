package com.wellsfargo.loanapp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.wellsfargo.loanapp.dto.ItemDTO;

public interface ItemService {

	ResponseEntity<List<ItemDTO>> getAllItems();

	ResponseEntity<ItemDTO> saveItem(String userName, ItemDTO itemDto);

	ResponseEntity<ItemDTO> updateItem(String userName, String itemId, ItemDTO itemDto);

	ResponseEntity<ItemDTO> deleteItem(String userName, String itemId);

}
