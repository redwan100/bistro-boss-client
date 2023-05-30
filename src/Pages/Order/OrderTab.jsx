import React from 'react'
import FoodCard from '../../Components/FoodCard/FoodCard';

const OrderTab = ({items}) => {

  return (
    <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <FoodCard key={item._id} item={item} />
      ))}


    </div>
  );
}

export default OrderTab