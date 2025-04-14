import React from 'react'
import style from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading'; 

function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false
  };

  // استخدام React Query لجلب الداتا
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return response.data.data; 
    }
  });

  if (isLoading) return <Loading />; 
  if (error) return <p className="text-red-500 text-center">Something went wrong</p>;

  return (
    <div className='my-5'>
      <Slider {...settings}>
        {data.map((category) => (
          <img key={category._id} src={category.image} className='w-full h-60' alt={category.name} />
        ))}
      </Slider>
    </div>
  )
}

export default CategorySlider
