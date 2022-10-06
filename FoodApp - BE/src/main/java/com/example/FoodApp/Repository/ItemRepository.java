package com.example.FoodApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.example.FoodApp.Models.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
	@Query("SELECT f from Item f WHERE food_order_id = :food_order_id")
	  List<Item> getItemsInOrder(@Param("food_order_id") int food_order_id);
	

}
