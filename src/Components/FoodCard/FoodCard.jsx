import { useContext } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
import useCart from "../../Hooks/useCart";


const FoodCard = ({item}) => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
    const {_id, image, name, price, recipe } = item;
const [, refetch] = useCart()
    const handleCart = () => {
      if (user && user.email) {
        const cartItem = {
          foodId : _id,
          name, 
          price,
          image,
          email:user.email
        }
        fetch("http://localhost:5000/carts", {
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(cartItem)
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully added item to cart",
                showConfirmButton: false,
                timer: 700,
              });
                refetch()
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        Swal.fire({
          title: "Please login to order the food",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    }
  return (
    <div className="card card-compact shadow-xl relative">
      <figure>
        <img
          src={image}
        />
      </figure>

      <p className="bg-slate-900 absolute top-1 right-2 text-gray-100 py-1 px-2 rounded-md">${price}</p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
            {recipe}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline border-0 border-b-orange-500 border-b-2" onClick={()=>handleCart(item)}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard