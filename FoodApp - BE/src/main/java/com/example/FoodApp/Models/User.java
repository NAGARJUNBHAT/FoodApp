package com.example.FoodApp.Models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String email;
	private String password;
	private String role;

	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true)
	@JsonIgnore
	Menu menu;
//	
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//	List<Branch> branches;

	@JsonManagedReference
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	List<FoodOrder> foodOrders;

//	public User(int id, String name, String email, String password, String role, Menu menu, List<Branch> branches,
//			List<FoodOrder> foodOrders) {
//		this.id = id;
//		this.name = name;
//		this.email = email;
//		this.password = password;
//		this.role = role;
//		this.menu = menu;
//		this.branches = branches;
//		this.foodOrders = foodOrders;
//	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}
//
//	public List<Branch> getBranches() {
//		return branches;
//	}
//
//	public void setBranches(List<Branch> branches) {
//		this.branches = branches;
//	}

	public List<FoodOrder> getFoodOrders() {
		return foodOrders;
	}

	public void setFoodOrders(List<FoodOrder> foodOrders) {
		this.foodOrders = foodOrders;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

//	@Override
//	public String toString() {
//		return "User [branches=" + branches + ", email=" + email + ", foodOrders=" + foodOrders + ", id=" + id
//				+ ", menu=" + menu + ", name=" + name + ", password=" + password + ", role=" + role + "]";
//	}

}
