import {createBrowserRouter} from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'
import Menu from '../Pages/Menu/Menu';
import Order from '../Pages/Order/Order';
import Login from '../Pages/Form/Login';
import SignUp from '../Pages/Form/SignUp';
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import MyCart from '../Pages/Dashboard/MyCart/MyCart';
import AllUser from '../Pages/Dashboard/AllUser/AllUser';
import AddItem from '../Pages/Dashboard/AddItem/AddItem';
import AdminRoute from './AdminRoute/AdminRoute';
import ManageItems from '../Pages/Dashboard/ManageItems/ManageItems';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order/:category",
        element: <Order />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "myCart",
        element: <MyCart />,
      },
      {
        path: "allusers",
        element: <AllUser />,
      },
      {
        path: "additem",
        element: (
          <AdminRoute>
            <AddItem />
          </AdminRoute>
        ),
      },
      {
        path:'manageitems',
        element:<ManageItems />
      }
    ],
  },
]);