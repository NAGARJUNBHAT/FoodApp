package com.example.FoodApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.FoodApp.Models.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
	 @Query("SELECT m from Menu m WHERE user_id= :user_id")
	  Menu getMenuByManagerId(@Param("user_id") int user_id);

}
