package com.wellsfargo.loanapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.loanapp.model.ItemMaster;

@Repository
public interface ItemRepository extends JpaRepository<ItemMaster,String>{

}
