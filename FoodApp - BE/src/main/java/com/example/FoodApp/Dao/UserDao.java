package com.example.FoodApp.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.FoodApp.Models.User;
import com.example.FoodApp.Repository.UserRepository;

@Repository
public class UserDao {

    @Autowired
	UserRepository userRepository;

	// 1. Create a new User
	public User addUser(User user) {
		return userRepository.save(user);
	}

	 // 2. Read a particular Users
	 public Optional<User> getUserById(int id) {
	 	return userRepository.findById(id);
	 }

	// 3. Update a user
	public User updateUser(User user) {
		userRepository.save(user);
		return user;
	}

	// 4. Delete a user
	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	// 5. Read all users
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	 // 6. Get List of all Staff members
	 public List<User> getAllStaff() {
	 	return userRepository.getAllStaffs("Staff");
	 }

	 // 7. Login user
	 public User loginUser(String email, String password) {
	 	return userRepository.getByEmailAndPassword(email, password);
	 }

}
