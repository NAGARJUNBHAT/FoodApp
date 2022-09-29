package com.example.FoodApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.FoodApp.Models.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

}
