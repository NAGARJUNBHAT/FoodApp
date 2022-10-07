package com.example.FoodApp.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.example.FoodApp.Models.FoodProduct;
import com.example.FoodApp.Repository.FoodProductRepository;

@Repository
public class FoodProductDao {
	
	@Autowired
	FoodProductRepository foodProductRepository;
	
	// 1. Add a Food Product
	public FoodProduct addFoodProduct(FoodProduct foodProduct) {
		return foodProductRepository.save(foodProduct);
	}
	
	// 2. Get Food by ID
	public Optional<FoodProduct> getFoodProductById(int id) {
		return foodProductRepository.findById(id);
	}
	
	// 3. Get All Food Products
	public List<FoodProduct> getAllFoodProducts() {
		return foodProductRepository.findAll();
	}
	
	//4. Update Food Product
	public FoodProduct updateFoodProduct(FoodProduct foodProduct) {
		foodProductRepository.save(foodProduct);
		return foodProduct;
	}
	
	// 5. Delete Food Product
	public void deleteFoodProduct(int id) {
		foodProductRepository.deleteById(id);
	}

	 // 6. Get Food Products Present in Menu
	 public List<FoodProduct> getMenuFoodProducts(int menuId){
	 	return foodProductRepository.getFoodProductsInMenu(menuId);
	 }
}
