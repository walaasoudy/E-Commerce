import React, { useEffect, useState } from 'react'
import Child from './Child';
import axios from 'axios';

function Parent() {
    
     const [items, setItems] = useState([]);
 

    async function getproducts(){
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setItems(response.data.data);
      console.log(response.data.data);
    }
    useEffect(()=>{
      getproducts();
    },[])
   
  return (
    <>
   
   
        <div className="row flex flex-wrap gap-4 ">
            {items.length > 0 ? items.map((item) => <div key={item._id} className="w-1/6 p-2 bg-white shadow-md rounded-lg">
            <img src={item.imageCover} alt="Product" className="w-full h-40 object-cover rounded-md" />
            <p className="text-sm mt-2">{item.description}</p>
          </div>):<span className="loader"></span>}
          </div>
        

    
    </>
  )
}

export default Parent
