import React, { useEffect, useState } from 'react'
import style from './NotFound.module.css'
import notfound from '../../assets/imgs/error.svg'
function NotFound() {
    const [data, setData] = useState([])
    useEffect(() => {
       }, [])
  return (
    <>

      <div className="flex justify-center items-center py-5">
        <img src={notfound} alt="Not Found" className="max-w-full h-auto" />
      </div>

    </>
  )
}

export default NotFound
