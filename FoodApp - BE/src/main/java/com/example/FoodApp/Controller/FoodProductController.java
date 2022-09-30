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

import com.example.FoodApp.Models.FoodOrder;
import com.example.FoodApp.Models.FoodProduct;
import com.example.FoodApp.Service.FoodProductService;
import com.example.FoodApp.util.ResponseStructure;

@RestController
@CrossOrigin
public class FoodProductController {
	
	@Autowired
	FoodProductService foodProductService;
	
	@PostMapping("/foodproduct/{menuId}")
	public ResponseEntity<ResponseStructure<FoodProduct>> saveFoodProduct(@RequestBody FoodProduct foodProduct, @PathVariable int menuId){
		return foodProductService.addFoodProduct(foodProduct, menuId);
	}
	@GetMapping("/foodproduct/{menuId}")
	public ResponseEntity<ResponseStructure<List<FoodProduct>>> getFoodProductsInMenu(@PathVariable int menuId){
		return foodProductService.getFoodProductsInMenu(menuId);
	}
	
	@GetMapping("/foodproduct")
    public ResponseEntity<ResponseStructure<List<FoodProduct>>> getAllFoodProduct() {
        return foodProductService.getAllFoodProduct();
    }
	
	@PutMapping("/foodproduct")
	public ResponseEntity<ResponseStructure<FoodProduct>> updateFoodProduct(@RequestBody FoodProduct foodProduct) {
		return foodProductService.updateFoodProduct(foodProduct);
	}
	
	@DeleteMapping("/foodproduct/{foodProductId}")
	public ResponseEntity<ResponseStructure<String>> deleteProduct(@PathVariable int foodProductId){
		return foodProductService.deleteFoodProduct(foodProductId);
	}

}
