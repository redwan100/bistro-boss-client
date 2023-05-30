import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/ContextProvider';
import { FaShoppingCart} from 'react-icons/fa'
import useCart from '../../../Hooks/useCart';
const Navbar = () => {
const navigate = useNavigate()
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart()

  const handleSignOut = () => {
    logOut().then(() => {
      navigate('/login')
    });
    
  }

    const options = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/menu">Our Menu</Link>
        </li>
        <li>
          <Link to="/order/salad">Order Food</Link>
        </li>

      <li className='relative w-max'>
        <Link to={'/dashboard/myCart'}>

          <FaShoppingCart size={20}/>
        </Link>

        <span className='absolute -top-1 -right-1 text-white bg-red-500 w-2 h-6 grid place-content-center text-xs font-medium rounded-full'>{cart?.length || 0}</span>
      </li>
        <li>
          {user ? (
            <>
              <button onClick={handleSignOut}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </li>
      </>
    );
  return (
    <div className="navbar bg-white/10 backdrop-blur-lg fixed z-50 top-0 left-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {options}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {options}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Get started</a>
      </div>
    </div>
  );
}

export default Navbar