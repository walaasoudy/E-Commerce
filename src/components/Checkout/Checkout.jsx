import React, { useState, useContext } from 'react';
import style from './Checkout.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import { useEffect } from 'react';
function Checkout() {
  const { checkOut, getCart } = useContext(CartContext);
  const [cartid, setcartid] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function getCartId() {
    const { data } = await getCart();
    setcartid(data.cartId);
  }


  async function handleCheckout(cartId, url) {
    setIsLoading(true);
    setApiError('');
    try {
      const { data } = await checkOut(cartId, url, formik.values);
      if (data.status === 'success') {
        // Assuming the API returns a session URL for redirection
        window.location.href = data.session.url; // Redirect to payment gateway
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    details: Yup.string().required('Details are required'),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
      .required('Phone is required'),
    city: Yup.string().required('City is required'),
  });
  useEffect(() => {
    getCartId();
  }, []);

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: () => handleCheckout(cartid, 'http://localhost:5173'),
  });

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="font-bold mb-5 text-xl" style={{ color: 'var(--main-color)' }}>
        Checkout
      </h2>
      {apiError && <div className="text-red-500 mb-3">{apiError}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            type="text"
            name="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-green-600">
            Enter Your Details
          </label>
          {formik.touched.details && formik.errors.details && (
            <div className="text-red-500 text-sm">{formik.errors.details}</div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel"
            name="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-green-600">
            Enter Your Phone
          </label>
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            type="text"
            name="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-green-600">
            Enter Your City
          </label>
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm w-full px-5 py-2.5"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;