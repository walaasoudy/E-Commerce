import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'


function Brand() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  async function getBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setBrands(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {brands.map((elm) => (
              <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 text-center shadow-md rounded"
                key={elm._id}
              >
                <img
                  src={elm.image}
                  className="w-full h-48 object-contain mb-3"
                  alt={elm.name}
                />
                <h3 className="text-green-600 font-bold text-xl">{elm.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Brand
