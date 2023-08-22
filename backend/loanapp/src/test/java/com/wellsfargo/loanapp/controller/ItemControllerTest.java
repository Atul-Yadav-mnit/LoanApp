package com.wellsfargo.loanapp.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanapp.dto.ItemDTO;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.service.ItemService;
import com.wellsfargo.loanapp.service.ResponseGenerator;

@WebMvcTest(ItemController.class)
public class ItemControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private ItemService itemService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public ItemDTO getItem()
	{
		ItemDTO item = new ItemDTO();
		item.setItemId("123456");
		item.setIssueStatus('1');
		item.setItemCategory("Furniture");
		item.setItemDescription("Description");
		item.setItemMake("Wooden");
		item.setItemValuation(2000);
		return item;
	}
	
	@Test
	public void getAllItems_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		
		List<ItemDTO> itemList = new ArrayList<>();
		itemList.add(getItem());
		
		ResponseEntity<List<ItemDTO>> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,itemList);
		
		when(itemService.getAllItems()).thenReturn(response);
		
		MvcResult result = mvc.perform(get("/item/all").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andReturn();
		
		verify(itemService,times(1)).getAllItems();
		
		
	}
	
	@Test
	public void saveItem_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"itemDescription\":\"Description\",\"issueStatus\":\"1\",\"itemMake\":\"Wooden\",\"itemCategory\":\"Furniture\",\"itemValuation\":2000}";
		ItemDTO item = getItem();
		String userName = "admin";
		
		ResponseEntity<ItemDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,item);
		
		when(itemService.saveItem(eq(userName), any(ItemDTO.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(post("/item/add?userName=admin")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(itemService,times(1)).saveItem(eq(userName), any(ItemDTO.class));
	}
	
	@Test
	public void updateItem_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"itemDescription\":\"Description\",\"issueStatus\":\"1\",\"itemMake\":\"Wooden\",\"itemCategory\":\"Furniture\",\"itemValuation\":2000}";
		ItemDTO item = getItem();
		String itemId = item.getItemId();
		String userName = "admin";
		
		ResponseEntity<ItemDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,item);
		
		when(itemService.updateItem(eq(userName), eq(itemId), any(ItemDTO.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(put("/item/"+itemId+"?userName=admin")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(itemService,times(1)).updateItem(eq(userName), eq(itemId), any(ItemDTO.class));
	}
	
	@Test
	public void deleteItem_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		ItemDTO item = getItem();
		String itemId = item.getItemId();
		String userName = "admin";
		
		ResponseEntity<ItemDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,item);
		
		when(itemService.deleteItem(eq(userName), eq(itemId))).thenReturn(response);
		
		MvcResult result = mvc.perform(delete("/item/"+itemId+"?userName=admin")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(itemService,times(1)).deleteItem(eq(userName), eq(itemId));
	}

}
