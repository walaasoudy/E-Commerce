import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Gallery from '../Gallery/Gallery'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import Loading from '../Loading/Loading'




function Home() {
  
 
    const [data, setData] = useState([])
    useEffect(() => {
       }, [])
  return (
    <>

      
   
      <Gallery/>
      <CategorySlider/>
      <Products/>

     
      
    </>
  )
}

export default Home
