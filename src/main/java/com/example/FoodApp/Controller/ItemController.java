package com.example.FoodApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.FoodApp.Models.Item;
import com.example.FoodApp.Service.ItemService;
import com.example.FoodApp.util.ResponseStructure;

@RestController
@CrossOrigin
public class ItemController {
    @Autowired
    ItemService itemService;
    
    @PostMapping("/item/{foodOrderId}")
    public ResponseEntity<ResponseStructure<Item>> saveItem(@RequestBody Item item,@PathVariable int foodOrderId){
        return itemService.saveItem(item,foodOrderId);
    }
}
