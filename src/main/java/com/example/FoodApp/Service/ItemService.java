package com.example.FoodApp.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.FoodApp.Dao.FoodOrderDao;
import com.example.FoodApp.Dao.FoodProductDao;
import com.example.FoodApp.Dao.ItemDao;
import com.example.FoodApp.Models.FoodOrder;
import com.example.FoodApp.Models.FoodProduct;
import com.example.FoodApp.Models.Item;
import com.example.FoodApp.util.ResponseStructure;

@Service
public class ItemService {
	
	@Autowired
    ItemDao itemDao;
    @Autowired
    FoodOrderDao foodOrderDao;
    @Autowired
    FoodProductDao foodProductDao;
    
    public ResponseEntity<ResponseStructure<Item>> saveItem(Item item, int foodOrderId){
        Optional<FoodProduct> foodProductOptional = foodProductDao.getFoodProductById(item.getId());
        ResponseStructure<Item> structure = null;
        if(foodProductOptional!=null) {
        	
        
	         structure=new ResponseStructure<>();
	        item.setId(foodProductOptional.get().getId());
	        item.setName(foodProductOptional.get().getName());
	        item.setType(foodProductOptional.get().getType());
	        item.setPrice(foodProductOptional.get().getPrice());
	        System.out.println(foodProductOptional.get().getId());
	        System.out.println(foodOrderId);
	        Optional<FoodOrder> foodOptional = foodOrderDao.getFoodOrderById(foodOrderId);
	        if(foodOptional.isEmpty()){
	            System.out.print("No id found");
	            
	        }else {
	          item.setFoodOrder(foodOptional.get());
	          structure.setError(false);
	            structure.setMessage("Item is added");
	            structure.setData(itemDao.addItem(item));
	        }
	                
	        return new ResponseEntity<ResponseStructure<Item>>(structure, HttpStatus.OK);
        }
        else {
        	return new ResponseEntity<ResponseStructure<Item>>(structure, HttpStatus.NOT_FOUND);
        }
        
    }

}
