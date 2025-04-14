import React, { createContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
const fetchProducts = async () => {
  
  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return res.data.data;
};

function Products() {
  let { addtocart } = useContext(CartContext)
  async function addproduct(id) {
    let res = await addtocart(id)
    if (res.status === 200) {
      console.log("Product added to cart")
      toast.success("Product added to cart")
      
      console.log(res)
    }
    else {
      console.log("Failed to add product to cart")
      toast.error("Failed to add product to cart")
      console.log(res)
    }
  }
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 6000  ,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500 text-center py-4">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map(product => (
          <div className="sm:w-1/2 md:w-1/3 lg:w-1/6 px-2" key={product.id}>
            <div className="product py-2 shadow-md rounded overflow-hidden">
              <Link to={`/productdetails/${product.id}`}>
                <img src={product.imageCover} className="w-full h-56 object-cover" alt="Product" />
                <h5 className="block text-center font-light text-green-600 mt-2">
                  {product.category.name}
                </h5>
                <h3 className="text-lg text-gray-800 font-normal text-center mb-4">
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h3>
                <div className="flex items-center justify-between px-4 mb-3">
                  <span>{product.price} EGP</span>
                  <span>{product.ratingsAverage} <i className="fa fa-star text-yellow-300"></i></span>
                </div>
                
              </Link>
              <div className="text-center">
                <button onClick={()=>addproduct(product.id)} className="btn bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
