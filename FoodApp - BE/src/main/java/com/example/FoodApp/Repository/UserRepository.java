package com.example.FoodApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.FoodApp.Models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	  @Query("SELECT u FROM User u WHERE email =:email AND password =:password")
	  User getByEmailAndPassword(@Param("email") String email, @Param("password") String password);
	  
	  @Query("SELECT u FROM User u WHERE role = :role")
	  List<User> getAllStaffs(@Param("role") String role);
	 
}
