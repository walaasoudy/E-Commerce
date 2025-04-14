import React from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'

function Categories() {
  const fetchCategories = async () => {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return response.data.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime : 8000000,
   
  });

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">Something went wrong...</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {data.map(category => (
          <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 px-2" key={category.id}>
            <div className="category py-2">
              <img src={category.image} className="w-full h-80" alt="category" />
              <h5 className="block text-center font-light text-green-600">{category.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
