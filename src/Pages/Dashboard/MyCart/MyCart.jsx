import React from 'react'
import useCart from '../../../Hooks/useCart'
import MyCartItem from './MyCartItem'
import { FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MyCart = () => {
    const [cart] = useCart()
    const total = cart.reduce((acc, cur) => {
       acc = cur.price + acc;
        return acc;
    },0)


  return (
    <div className="">
      <div className="uppercase flex justify-evenly items-center h-20 font-semibold">
        <h1>Total Items: {cart.length}</h1>
        <h1>Total Price: {total.toFixed(2)}</h1>

        <Link to={'/dashboard/payment'}>
          <button className="btn btn-xs bg-orange-500 border-none">Pay</button>
        </Link>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Food</th>
              <th>Item name</th>

              <th>price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <MyCartItem key={item._id} index={index} cart={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyCart