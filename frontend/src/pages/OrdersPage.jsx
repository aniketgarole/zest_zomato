import React, { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async() => {
    try {
      let res = await axios.get(`http://localhost:8000/api/orders/`)
      setOrders(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrders()
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      let res = await axios.patch(`http://localhost:8000/api/orders/${orderId}/`, {'status': newStatus})
      getOrders()
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteOrder = async(orderId) => {
    try {
      let res = await axios.delete(`http://localhost:8000/api/orders/${orderId}/`)
      getOrders()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
    <Navbar/>
    <div className="orders-container">
      <h1 className="orders-heading">Orders</h1>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id} className={`order-item ${order.status}`}>
            <div className="order-details">
              <h2 className="customer-name">C. Name: {order.customer_name}</h2>
              <p className="dish-name">Dish id: {order.dish}</p>
            </div>
            <div className="order-actions">
              <span className={`order-status ${order.status}`}>{order.status}</span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="status-select"
                >
                <option value="received">Received</option>
                <option value="preparing">Preparing</option>
                <option value="delivered">Delivered</option>
              </select>
              <button onClick={() => handleDeleteOrder(order.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
        </>
  );
};

export default OrdersPage;
