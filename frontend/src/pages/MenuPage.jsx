import React, { useState, useEffect } from 'react';
import '../styles/MenuPage.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const MenuPage = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState('');
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState(0);
  const [dishAvailability, setDishAvailability] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  

    const getDishes = async() => {
        try {
            let res = await axios(`http://localhost:8000/api/dishes/`)
            // console.log(res)
            setDishes(res.data);
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

  useEffect(() => {
    
    getDishes()

    
  }, []);

  const handleEdit = (dish) => {
    setSelectedDish(dish.id);
    setDishName(dish.name);
    setDishPrice(dish.price);
    setDishAvailability(dish.is_available);
    setUpdateMode(true);
  };

  const handleAddNew = () => {
    setSelectedDish('');
    setDishName('');
    setDishPrice(0);
    setDishAvailability(false);
    setUpdateMode(false);
  };

  const handleSave = async () => {
    if (updateMode) {
      
      const updatedDish = {
        
        name: dishName,
        price: dishPrice,
        is_available: dishAvailability,
      };

    //   console.log(updatedDish)

      try {
        let res = await axios.patch(`http://localhost:8000/api/dishes/${selectedDish}/`, updatedDish)
        getDishes()
      } catch (error) {
        console.log(error)
      }
      
    } else {
      
      const newDish = {
       
        name: dishName,
        price: dishPrice,
        is_available: dishAvailability,
      };

      try {
        let res = await axios.post('http://localhost:8000/api/dishes/', newDish)
        getDishes()
      } catch (error) {
        console.log(error)
      }
    //   setDishes([...dishes, newDish]);
    }
    handleAddNew();
  };


  const handleDelete = async(id) => {
    try {
        let res = await axios.delete(`http://localhost:8000/api/dishes/${id}/`)
        getDishes()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
    <Navbar/>
    <div className="menu-container">
      <h1 className="menu-heading">Menu</h1>
      <div className="menu-form">
        <label htmlFor="dishName">Dish Name:</label>
        <input
          type="text"
          id="dishName"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          />
        <label htmlFor="dishPrice">Dish Price:</label>
        <input
          type="number"
          id="dishPrice"
          value={dishPrice}
          onChange={(e) => setDishPrice(e.target.value)}
          />
        <label htmlFor="dishAvailability">Available:</label>
        <input
          type="checkbox"
          id="dishAvailability"
          checked={dishAvailability}
          onChange={() => setDishAvailability(!dishAvailability)}
          />
        <button onClick={handleSave} className="menu-button">
          {updateMode ? 'Update Dish' : 'Add Dish'}
        </button>
        {updateMode && (
            <button onClick={handleAddNew} className="menu-button">
            Cancel
          </button>
        )}
      </div>
      <div className="dishes-list">
        {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
            <h2>{dish.name}</h2>
            <p>Price:  &#8377;{Number(dish.price).toFixed(2)}</p>
            <p>Availability: {dish.is_available ? 'Available' : 'Not Available'}</p>
            <div className='buttons'>
            <button onClick={() => handleEdit(dish)} className="edit-button">
              Edit
            </button>
            <button onClick={()=> handleDelete(dish.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
  );
};

export default MenuPage;
