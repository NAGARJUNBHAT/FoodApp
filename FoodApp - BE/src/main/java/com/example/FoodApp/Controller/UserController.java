package com.example.FoodApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.FoodApp.Models.User;
import com.example.FoodApp.Service.UserService;
import com.example.FoodApp.util.ResponseStructure;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("/all")
	public ResponseEntity<ResponseStructure<List<User>>> getAllUsers() {
		return userService.getUsers();
	}

	@GetMapping("/getallstaffs")
	public ResponseEntity<ResponseStructure<List<User>>> getAllStaffs() {
		return userService.getAllStaffs();
	}

	@PostMapping("/user")
	public ResponseEntity<ResponseStructure<User>> saveUser(@RequestBody User user) {
		return userService.saveUser(user);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<ResponseStructure<User>> getUserById(@PathVariable int userId) {
		return userService.getUserById(userId);
	}
  
	@PutMapping("/user")
	public ResponseEntity<ResponseStructure<User>> updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}

	@DeleteMapping("/user/{userId}")
	public ResponseEntity<ResponseStructure<String>> deleteUser(@PathVariable int userId) {
		return userService.deleteUser(userId);
	}

	
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<User>> login(@RequestBody User user) {
		return userService.login(user.getEmail(),user.getPassword());
	}


//	@PostMapping("/login")
//	public ResponseEntity<ResponseStructure<User>> login(@RequestBody User user) {
//		return userService.login(user.getEmail(),user.getPassword());
//	}
}
