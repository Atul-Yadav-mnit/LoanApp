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
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.ArgumentMatchers.eq;

import com.wellsfargo.loanapp.config.SecurityConfiguration;
import com.wellsfargo.loanapp.config.TestSecurityConfiguration;
import org.mockito.ArgumentMatchers;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.loanapp.dto.ItemDTO;
import com.wellsfargo.loanapp.model.ItemMaster;
import com.wellsfargo.loanapp.service.ItemService;
import com.wellsfargo.loanapp.service.ResponseGenerator;

@WebMvcTest(ItemController.class)
@ContextConfiguration(classes = TestSecurityConfiguration.class)
@Import(ItemController.class)
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

		String bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMDgxNTciLCJpYXQiOjE2OTI4NzU5MzEsImV4cCI6MTY5Mjk2MjMzMX0.iBe3ePAjjwlZEvnjS6RJ2B0gstbXgWIlRllrkh3e2-Q";
		
		MvcResult result = mvc.perform(get("/api/v1/item/all").accept(MediaType.APPLICATION_JSON).header("Authorization", "Bearer " + bearerToken))
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

		ResponseEntity<ItemDTO> response = ResponseGenerator.generateResponse(HttpStatus.CREATED, null,item);
		
		when(itemService.saveItem(ArgumentMatchers.nullable(UserDetails.class), any())).thenReturn(response);

		objectMapper.writeValueAsString(response.getBody());

		MvcResult result = mvc.perform(post("/api/v1/item/add?userName=admin")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isCreated())
				.andReturn();

		System.out.println("Response Content: ");
		System.out.println(result.getResponse().getContentAsString());
		
		verify(itemService,times(1)).saveItem(nullable(UserDetails.class), any(ItemDTO.class));
	}
	
	@Test
	public void updateItem_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		String jsonContent = "{\"itemDescription\":\"Description\",\"issueStatus\":\"1\",\"itemMake\":\"Wooden\",\"itemCategory\":\"Furniture\",\"itemValuation\":2000}";
		ItemDTO item = getItem();
		String itemId = item.getItemId();
		String userName = "admin";
		
		ResponseEntity<ItemDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,item);
		
		when(itemService.updateItem(nullable(UserDetails.class), eq(itemId), any(ItemDTO.class))).thenReturn(response);
		
		MvcResult result = mvc.perform(put("/api/v1/item/"+itemId+"?userName=admin")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(jsonContent)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(itemService,times(1)).updateItem(nullable(UserDetails.class), eq(itemId), any(ItemDTO.class));
	}
	
	@Test
	public void deleteItem_shouldHaveCorrectRequestAndResponseMapping() throws Exception {
		ItemDTO item = getItem();
		String itemId = item.getItemId();
		String userName = "admin";
		
		ResponseEntity<ItemDTO> response = ResponseGenerator.generateResponse(HttpStatus.OK, null,item);
		
		when(itemService.deleteItem(nullable(UserDetails.class), eq(itemId))).thenReturn(response);
		
		MvcResult result = mvc.perform(delete("/api/v1/item/"+itemId+"?userName=admin")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(content().json(objectMapper.writeValueAsString(response.getBody())))
				.andExpect(status().isOk())
				.andReturn();
		
		verify(itemService,times(1)).deleteItem(nullable(UserDetails.class), eq(itemId));
	}

}
