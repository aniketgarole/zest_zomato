import React from 'react'
import { Routes,Route } from 'react-router-dom'
import MenuPage from '../pages/MenuPage'
import HomePage from '../pages/Homepage'
import OrdersPage from '../pages/OrdersPage'
import PlaceOrderPage from '../pages/PlaceOrderPage'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/menu" element={<MenuPage/>}></Route>
        <Route path="/place-order" element={<PlaceOrderPage/>}></Route>
        <Route path="/order-list" element={<OrdersPage/>}></Route>
    </Routes>
  )
}

export default AllRoutes