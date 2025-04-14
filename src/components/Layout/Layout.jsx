import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
    const [data, setData] = useState([])
    useEffect(() => {
       }, [])
  return (
    <>
      <Navbar/>
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer/>
      
    </>
  )
}

export default Layout
