import React from 'react'
import Navbar from '../Pages/Shared/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Pages/Shared/Footer/Footer'

const Layout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div>
      {/* {noHeaderFooter || <Navbar />} */}
      <Navbar />
      <Outlet />

      {noHeaderFooter || <Footer />}
    </div>
  );
}

export default Layout