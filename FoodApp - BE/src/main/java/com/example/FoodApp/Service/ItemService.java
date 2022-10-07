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
        ResponseStructure<Item> structure=new ResponseStructure<>();
     
        Optional<FoodProduct> foodProductOptional = foodProductDao.getFoodProductById(item.getId());
        Item itemToBeadded= new Item();
        itemToBeadded.setName(foodProductOptional.get().getName());
        itemToBeadded.setType(foodProductOptional.get().getType());
        itemToBeadded.setPrice(foodProductOptional.get().getPrice());
        itemToBeadded.setQuantity(item.getQuantity());
        Optional<FoodOrder> foodOptional = foodOrderDao.getFoodOrderById(foodOrderId);
        if(foodOptional.isEmpty()){
            System.out.print("No id found");
            
        }else {
          itemToBeadded.setFoodOrder(foodOptional.get());
          structure.setError(false);
            structure.setMessage("Item is added");
            structure.setData(itemDao.addItem(itemToBeadded));
        }
                
        return new ResponseEntity<ResponseStructure<Item>>(structure, HttpStatus.OK);
        
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
			item.setName(item2.getName());
			item.setPrice(item2.getPrice());
			item.setType(item2.getType());
			item.setFoodOrder(foodOrder);
			structure.setError(false);
			structure.setMessage("Item Updated");
			structure.setData(itemDao.editItem(item));
		}
		else {
			structure.setError(false);
			structure.setMessage("Item not  Updated");
		}
		
		
		return new ResponseEntity<ResponseStructure<Item>>(structure, HttpStatus.OK);
	
    }
    
}
