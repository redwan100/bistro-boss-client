import React from 'react'
import { FaTrash} from 'react-icons/fa';
import useCart from '../../../Hooks/useCart';
import Swal from 'sweetalert2'
const MyCartItem = ({index,cart}) => {
    const {_id,image, name, price} = cart;
    const [, refetch] = useCart();
    const handleDelete = (_id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
           fetch(`http://localhost:5000/cartdelete/${_id}`, {
             method: "DELETE",
           })
             .then((response) => response.json())
             .then((data) => {
               if (data.deletedCount > 0) {
                 refetch();
                  Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                  );
               }
             })
             .catch((error) => console.log("error", error));
        }
      });
    }
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="food img" />
            </div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td className="text-end">${price}</td>
      <th>
        <button
          className="btn btn-ghost btn-xs text-rose-500"
          onClick={()=>handleDelete(_id)}
        >
          <FaTrash size={15} title='Delete'/>
        </button>
      </th>
    </tr>
  );
}

export default MyCartItem