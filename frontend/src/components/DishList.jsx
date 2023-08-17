import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DishList = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get('/api/dishes/')
      .then(response => setDishes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {dishes.map(dish => (
          <li key={dish.id}>{dish.name} - ${dish.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;
