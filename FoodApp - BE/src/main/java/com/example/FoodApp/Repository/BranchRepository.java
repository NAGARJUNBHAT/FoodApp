package com.example.FoodApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.FoodApp.Models.Branch;

public interface BranchRepository extends JpaRepository<Branch, Integer> {

}
