package com.example.FoodApp.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.FoodApp.Dao.FoodProductDao;
import com.example.FoodApp.Dao.MenuDao;
import com.example.FoodApp.Dao.UserDao;
import com.example.FoodApp.Models.FoodProduct;
import com.example.FoodApp.Models.Menu;
import com.example.FoodApp.util.ResponseStructure;

@Service
public class FoodProductService {
	
	@Autowired
	FoodProductDao foodProductDao;
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	MenuDao menuDao;
	
	public  ResponseEntity<ResponseStructure<FoodProduct>> addFoodProduct(FoodProduct foodProduct, int menuId) {
		ResponseStructure<FoodProduct> structure = new ResponseStructure<>();
		Optional<Menu> optional = menuDao.getMenuById(menuId); 
		if(optional.isEmpty()) {
			structure.setError(true);
			structure.setMessage("No menu Id found");
			System.out.println("No menu with that id");
		}else {
			foodProduct.setMenu(optional.get());
			structure.setError(false);
			structure.setMessage("Food Product Saved");
			structure.setData(foodProductDao.addFoodProduct(foodProduct));
		}		
		return new ResponseEntity<ResponseStructure<FoodProduct>>(structure, HttpStatus.OK);
	}
	
	public ResponseEntity<ResponseStructure<List<FoodProduct>>> getFoodProductsInMenu(int menuId){
		ResponseStructure<List<FoodProduct>> structure = new ResponseStructure<>();
		structure.setError(false);
		structure.setMessage("food products in menu retrived");
		structure.setData(foodProductDao.getMenuFoodProducts(menuId));
		return new ResponseEntity<ResponseStructure<List<FoodProduct>>>(structure, HttpStatus.OK);
	}
	
	public ResponseEntity<ResponseStructure<List<FoodProduct>>> getAllFoodProduct() {
        ResponseStructure<List<FoodProduct>> structure = new ResponseStructure<>();
            structure.setError(false);
            structure.setMessage("Food Products Retrived");
            structure.setData(foodProductDao.getAllFoodProducts());
        return new ResponseEntity<ResponseStructure<List<FoodProduct>>>(structure, HttpStatus.OK);
    }
	
	public ResponseEntity<ResponseStructure<FoodProduct>> updateFoodProduct(FoodProduct foodProduct) {
		ResponseStructure<FoodProduct> structure = new ResponseStructure<>();
		FoodProduct foodProductTobeUpdated = foodProductDao.getFoodProductById(foodProduct.getId()).get();
//		User user = foodProductTobeUpdated.getUser();
		Menu menu= foodProductTobeUpdated.getMenu();
//		foodProduct.setUser(user);
		foodProduct.setMenu(menu);
		
		structure.setError(false);
		structure.setMessage("Food Product Status Updated");
		structure.setData(foodProductDao.updateFoodProduct(foodProduct));

		return new ResponseEntity<ResponseStructure<FoodProduct>>(structure, HttpStatus.OK);
	}
	
	public ResponseEntity<ResponseStructure<String>> deleteFoodProduct(int id){
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<FoodProduct> optional = foodProductDao.getFoodProductById(id);
		if(optional.isEmpty()) {
			structure.setError(true);
			structure.setMessage("No id found");
		}
		else {
			structure.setError(false);
			structure.setMessage("Food Product deleted");
			foodProductDao.deleteFoodProduct(id);
		}
		return new ResponseEntity<ResponseStructure<String>>(structure, HttpStatus.OK);

	}


}
