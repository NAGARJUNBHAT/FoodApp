package com.example.FoodApp.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.FoodApp.Dao.FoodOrderDao;
import com.example.FoodApp.Dao.UserDao;
import com.example.FoodApp.Models.FoodOrder;
import com.example.FoodApp.Models.User;
import com.example.FoodApp.util.ResponseStructure;

@Service
public class FoodOrderService {

	@Autowired
	FoodOrderDao foodOrderDao;

	@Autowired
	UserDao userDao;

//	@Autowired
//	private EmailSenderService senderService;

	public ResponseEntity<ResponseStructure<FoodOrder>> saveFoodOrder(FoodOrder foodOrder, int id) {
		Optional<User> optional = userDao.getUserById(id);
		ResponseStructure<FoodOrder> structure = new ResponseStructure<>();
		
		if(optional.get().getRole().equals("BranchManager")) {
			structure.setError(true);
			structure.setMessage("Only staff can create orders");
			return new ResponseEntity<ResponseStructure<FoodOrder>>(structure, HttpStatus.OK);
		}
		if (optional.isEmpty()) {
			System.out.println("No id found");
		} else {
			foodOrder.setUser(optional.get());
		}

		
		structure.setError(false);
		structure.setMessage("Food Order Placed");
		structure.setData(foodOrderDao.addFoodOrder(foodOrder));

		return new ResponseEntity<ResponseStructure<FoodOrder>>(structure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<List<FoodOrder>>> getFoodOrder(int userId) {
		ResponseStructure<List<FoodOrder>> structure = new ResponseStructure<>();
		Optional<User> optional = userDao.getUserById(userId);
		if (optional.isEmpty()) {
			structure.setError(true);
			structure.setMessage("No user found");
		} else {
			structure.setError(false);
			structure.setMessage("Food Order Retrived");
			structure.setData(optional.get().getFoodOrders());
		}
		return new ResponseEntity<ResponseStructure<List<FoodOrder>>>(structure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<FoodOrder>> getFoodOrderByItsId(int foodOrderId) {
		ResponseStructure<FoodOrder> structure = new ResponseStructure<>();
		Optional<FoodOrder> foodOrderOptional = foodOrderDao.getFoodOrderById(foodOrderId);
		if (foodOrderOptional.isEmpty()) {
			structure.setError(true);
			structure.setMessage("No foodOrder found");
		} else {
			structure.setError(false);
			structure.setMessage("Food Order Retrived");
			structure.setData(foodOrderOptional.get());
		}
		return new ResponseEntity<ResponseStructure<FoodOrder>>(structure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<FoodOrder>> updateFoodOrder(FoodOrder foodOrder) {
		ResponseStructure<FoodOrder> structure = new ResponseStructure<>();
		FoodOrder foodOrderTobeUpdated = foodOrderDao.getFoodOrderById(foodOrder.getId()).get();
		User user = foodOrderTobeUpdated.getUser();
		foodOrder.setUser(user);
		structure.setError(false);
		structure.setMessage("Food Order Status Updated");
		structure.setData(foodOrderDao.updateFoodOrder(foodOrder));

		return new ResponseEntity<ResponseStructure<FoodOrder>>(structure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<FoodOrder>> updateStatus(String status, int foodOrderId) {
		ResponseStructure<FoodOrder> structure = new ResponseStructure<>();
		FoodOrder foodOrderTobeUpdated = foodOrderDao.getFoodOrderById(foodOrderId).get();
//		User user = foodOrderTobeUpdated.getUser();
//		foodOrder.setUser(user);
		if(status.equals("delivered")) {
			foodOrderTobeUpdated.setOrderDeliveryTime(new Date());
			
		}
		foodOrderTobeUpdated.setStatus(status);
		structure.setError(false);
		structure.setMessage("Food Order Status Updated");
		structure.setData(foodOrderDao.updateFoodOrder(foodOrderTobeUpdated));

		return new ResponseEntity<ResponseStructure<FoodOrder>>(structure, HttpStatus.OK);
	}
	
//	public void triggerMail(String body, String mailID) throws MessagingException {
//		senderService.sendSimpleEmail(mailID, "Order Details - FoodApp", body);
//	}

	public ResponseEntity<ResponseStructure<String>> deleteFoodOrderById(int id) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		Optional<FoodOrder> optional = foodOrderDao.getFoodOrderById(id);
		if (optional.isEmpty()) {
			structure.setError(true);
			structure.setMessage("Food Order Not Found");
		} else {
			structure.setError(false);
			structure.setMessage("Food Order Deleted");
			foodOrderDao.deleteFoodOrder(id);
		}

		return new ResponseEntity<ResponseStructure<String>>(structure, HttpStatus.OK);
	}

}