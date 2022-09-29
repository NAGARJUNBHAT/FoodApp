package com.example.FoodApp.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.FoodApp.Models.FoodOrder;
import com.example.FoodApp.Repository.FoodOrderRepository;

@Repository
public class FoodOrderDao {
	
	@Autowired
	FoodOrderRepository foodOrderRepository;
	
	// 1. Add Food Order
	public FoodOrder addFoodOrder(FoodOrder foodOrder) {
		return foodOrderRepository.save(foodOrder);
	}

	// 2. Get Food Order By ID
	public Optional<FoodOrder> getFoodOrderById(int id) {
		return foodOrderRepository.findById(id);
	}
	
	// 3. List All Food Orders
	public List<FoodOrder> getAllFoodOrder() {
		return foodOrderRepository.findAll();
	}
	
	// 4. Update Food Order Details
	public FoodOrder updateFoodOrder(FoodOrder foodOrder) {
		foodOrderRepository.save(foodOrder);
		return foodOrder;
	}
	
	// 5. Delete Food Order
	public void deleteFoodOrder(int id) {
		foodOrderRepository.deleteById(id);
	}

}
