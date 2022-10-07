package com.example.FoodApp.Service;

import java.util.List;
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
    
    public ResponseEntity<ResponseStructure<List<Item>>> getItems(int foodOrderId){
		ResponseStructure<List<Item>> structure = new ResponseStructure<>();
		structure.setError(false);
		structure.setMessage("Items in food order retrived");
		structure.setData(itemDao.getItemsByOrderId(foodOrderId));
		return new ResponseEntity<ResponseStructure<List<Item>>>(structure, HttpStatus.OK);
	}

    
    public ResponseEntity<ResponseStructure<Item>> editItem(Item item){	
    	ResponseStructure<Item> structure = new ResponseStructure<>();
    	
		Item item2 = itemDao.getItemById(item.getId()).get();
		if(item2!=null) {
			FoodOrder foodOrder = item2.getFoodOrder();
			item2.setFoodOrder(foodOrder);
			item2.setQuantity(item.getQuantity());
			structure.setError(false);
			structure.setMessage("Item Updated");
			structure.setData(itemDao.editItem(item2));
		}
		else {
			structure.setError(false);
			structure.setMessage("Item not  Updated");
//			structure.setData(itemDao.editItem(item2));
		}
		
		
		return new ResponseEntity<ResponseStructure<Item>>(structure, HttpStatus.OK);
	
		
//    	Optional<Item> optional = itemDao.getItemById(item.getId());
//    	if(optional.isEmpty()) {
//    	   structure.setError(true);
//    	   structure.setMessage("No id found");
//    	}else {
//    		item.setId(optional.get().getId());
// 	        item.setName(optional.get().getName());
// 	        item.setType(optional.get().getType());
// 	        item.setPrice(optional.get().getPrice());
// 	        item.setQuantity(item.getQuantity());
// 	        Optional<FoodOrder> foodOptional = foodOrderDao.getFoodOrderById(foodOrderId);
//	        if(foodOptional.isEmpty()){
//	            System.out.print("food order id not found");
//	            
//	        }else {
////	        	item.setFoodOrder(foodOptional.get());
//	          	structure.setError(false);
//	  			structure.setMessage("Item updated");
//	            structure.setData(itemDao.editItem(item));
//	        }
//    	}      
//	       return new ResponseEntity<ResponseStructure<Item>>(structure, HttpStatus.OK);
//   
    
    }
    
}
