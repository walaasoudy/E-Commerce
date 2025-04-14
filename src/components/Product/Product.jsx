import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

function Product() {
  const { id } = useParams();
  const { addtocart } = useContext(CartContext);

  async function addProductToCart(productId) {
    try {
      const res = await addtocart(productId);
      if (res.status === 200) {
        toast.success('Product added to cart');
      } else {
        toast.error('Failed to add product');
      }
    } catch (err) {
      toast.error('An error occurred');
      console.error(err);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      return response.data.data;
    }
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-600">Something went wrong</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white max-w-xl mx-auto rounded-xl shadow-md p-6 space-y-4">
        <Slider {...settings}>
          {data?.images?.map(image => (
            <img key={image} src={image} alt="Product" className="w-full h-72 object-contain rounded" />
          ))}
        </Slider>

        <h5 className="text-center text-green-600 font-light">{data.category?.name}</h5>
        <h3 className="text-center text-lg text-gray-800 font-medium">{data.title}</h3>
        <p className="text-gray-600 text-center">{data.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-800 font-bold">{data.price} EGP</span>
          <span className="text-yellow-500">{data.ratingsAverage} <i className="fa fa-star"></i></span>
        </div>

        <button
          onClick={() => addProductToCart(data.id)}
          className="block w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
