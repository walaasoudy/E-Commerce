import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/freshcart-logo.svg";
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';

function Navbar() {
 let navigate = useNavigate();
  const { userlogin, setUserlogin }= useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);

  function Logout(){
    localStorage.removeItem('userToken');
    setUserlogin(null);
    navigate('/login');
  }

  useEffect(() => { }, []);

  return (
    <>
      <nav className="bg-gray-50 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-10" alt="Logo" />
          </NavLink>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Nav Links */}
          <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-6 md:mt-0 md:border-0 md:bg-gray-50">
              {userlogin !== null ? (
                <>
                  <li><NavLink to="/" className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Home</NavLink></li>
              
                  <li><NavLink to="/products" className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Products</NavLink></li>
                  <li><NavLink to="/brand" className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Brand</NavLink></li>
                  <li><NavLink to="/cart" className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Cart</NavLink></li>
                  <li><NavLink to="/categories" className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Categories</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/login" className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Login</NavLink></li>
                  <li><NavLink to="/register" className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Register</NavLink></li>
                </>
              )}

              {userlogin !== null && (
                <li onClick={Logout}>
                  <span className="cursor-pointer block py-2 px-3 rounded md:p-0 text-gray-900 hover:underline">Logout</span>
                </li>
              )}

              <li className="flex gap-3 items-center px-3 py-2 text-gray-700">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-linkedin"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>



      {/* <nav className="bg-gray-50 top-0 left-0 right-0 items-center text-center ">
        <div className="container p-5 px-16 flex flex-col lg:flex-row items-center  justify-between ">
          <div className="flex flex-col lg:flex-row">
            <img src={logo} alt="" width={100} />
            <ul className="flex flex-col lg:flex-row">
              <li className="text-slate-900 py-2 "><NavLink className="mx-3  font-light" to="/" >Home</NavLink> </li>
              <li className="text-slate-900 py-2"><NavLink className="mx-3  font-light" to="/about">About</NavLink></li>
              <li className="text-slate-900 py-2"><NavLink className="mx-3  font-light" to="/products">Products</NavLink></li>
              <li className="text-slate-900 py-2">
                <NavLink className="mx-3  font-light" to="/brand">Brand</NavLink>
              </li>
              <li className="text-slate-900 py-2 ">
                <NavLink className="mx-3  font-light" to="/cart">Cart</NavLink>
              </li>
              <li className="text-slate-900 py-2">
                <NavLink className="mx-3  font-light" to="/categories">Categories</NavLink>
              </li>
            </ul>


          </div>




          <div className="flex flex-col lg:flex-row items-center">
            <ul className="flex flex-col lg:flex-row items-center">
              <li className="text-slate-900 py-2"><NavLink className="mx-3  font-light" to="/login" >Login</NavLink> </li>
              <li className="text-slate-900 py-2"><NavLink className="mx-3  font-light" to="/register">Register</NavLink></li>
              <li className="text-slate-900 py-2 mx-3  font-light">
                <span>Logout</span> </li>
              <li className="flex items-center">
                <i className="fab fa-facebook  mx-2"></i>
                <i className="fab fa-twitter mx-2 "></i>
                <i className="fab fa-instagram  mx-2"></i>
                <i className="fab fa-youtube mx-2 "></i>
                <i className="fab fa-linkedin mx-2 "></i>

              </li>
            </ul>

          </div>

        </div>
        
      </nav> */}

    </>
  );
}

export default Navbar;
