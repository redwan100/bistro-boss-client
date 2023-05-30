import React from "react";
import {
  FaCalendarAlt,
  FaHamburger,
  FaHome,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useDynamicTitle from "../Hooks/useDynamicTitle";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
  useDynamicTitle("Dashboard");
  const [cart] = useCart()


  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-yellow-500/20 backdrop-blur-lg text-base-content">
          <li>
            <Link to={"/dashboard/userhome"}>
              <FaHome />
              User Home
            </Link>
          </li>
          <li>
            <NavLink
              to={"/dashboard/myCart"}
              className={({ isActive }) => (isActive ? "text-white" : "")}
            >
              <FaShoppingCart />
              Shopping Cart
            
                <div className="badge badge-secondary">+{cart.length}</div>
           
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/reservation"}
              className={({ isActive }) => (isActive ? "text-white" : "")}
            >
              <FaCalendarAlt /> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/history"}>
              <FaWallet /> Payment History
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <Link to={'/'}>
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link>
              <FaHamburger /> Our Menu
            </Link>
          </li>
          <li>
            <Link>
              <FaHome /> Order Food
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
