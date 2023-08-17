import React, { useState, useEffect } from 'react';
import '../styles/PlaceOrderPage.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const PlaceOrderPage = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [dishPrice, setDishPrice] = useState(0);
  const [orderStatus, setOrderStatus] = useState('');
  const [dishid, setDishid] = useState("")

  // console.log("dishid", dishid)

  const getDishes = async() => {
    try {
      let res = await axios(`http://localhost:8000/api/dishes/`)
      // console.log(res.data, "order")
      setDishes(res.data)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getDishes()
  }, []);

  const handlePlaceOrder = async () => {
    // console.log(dishid)
    const selectedDishObj = dishes.find((dish) => dish.id == dishid);
    // console.log(selectedDishObj)

    if (selectedDishObj && selectedDishObj.is_available) {
      
      

      const newOrder = {
        customer_name : customerName,
        dish: selectedDish,
        status: "received"
      }

      //  console.log(newOrder)

      try {
        let res = await axios.post(`http://localhost:8000/api/orders/`, newOrder)
        setOrderStatus('success');
      } catch (error) {
        console.log(error)
      }
    } else {
      setOrderStatus('error');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="place-order-container">
      <h1 className="place-order-heading">Place Your Order</h1>
      <div className="order-form">
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          />
        <label htmlFor="dishSelect">Select Dish:</label>
        <select
          id="dishSelect"
          value={selectedDish}
          onChange={(e) => {
              const selectedDishId = e.target.value;
              setDishid(selectedDishId)
              // console.log("selectedDishId", selectedDishId)
              const selectedDishObj = dishes.find((dish) => dish.id == selectedDishId);
              // console.log(selectedDishObj)
              setSelectedDish(selectedDishId);
              if (selectedDishObj) {
                  setDishPrice(selectedDishObj.price);
                }
            }}
            >
          <option value="">Select a dish</option>
          {dishes.map((dish) => (
              <option key={dish.id} value={dish.id}>
              {dish.name} ({dish.is_available ? 'Available' : 'Not Available'}) - ${Number(dish.price).toFixed(2)}
            </option>
          ))}
        </select>
        <p>Price: ${Number(dishPrice).toFixed(2)}</p>
        <button onClick={handlePlaceOrder} className="place-order-button">
          Place Order
        </button>
      </div>
      {orderStatus === 'success' && (
          <p className="order-success">Order placed successfully!</p>
          )}
      {orderStatus === 'error' && (
          <p className="order-error">Sorry, the selected dish is not available for order.</p>
          )}
    </div>
          </>
  );
};

export default PlaceOrderPage;
