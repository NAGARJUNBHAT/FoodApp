package com.example.FoodApp.Dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.FoodApp.Models.Menu;
import com.example.FoodApp.Repository.MenuRepository;

@Repository
public class MenuDao {
	
	@Autowired
	MenuRepository menuRepository;
	
	// 1. Create a new Menu
	public Menu addMenu(Menu menu) {
		return menuRepository.save(menu);
	}
	
	// 2. Find Menu by Id
	public Optional<Menu> getMenuById(int id) {
		return menuRepository.findById(id);
	}
		
	// 3. Delete Menu
	public void deleteMenu(int id) {
		menuRepository.deleteById(id);
	}
	
	 // 4. Get Menu of a Manager
	 public Menu getMenuByManagerId(int mId) {
	 	return menuRepository.getMenuByManagerId(mId);
	 }
}
