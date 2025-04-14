import React, { useEffect, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';

function Login() {
const { userlogin, setUserlogin }= useContext(UserContext)
  let [apierror, setapierror] = useState('');
  let [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email format').required('Email is required'),

    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),

  });

  async function handleLogin(formValues) {
    setisloading(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
      .then(function (response) {
        if(response.data.message === 'success') {
        console.log(response.data);
          localStorage.setItem('userToken', response.data.token);
          setUserlogin(response.data.token);
          console.log(userlogin);
        setisloading(false);
        navigate('/')
        }
      }).catch(function (err) {
        console.log(err.response.data.message);
        setapierror(err.response.data.message);
        setisloading(false);


      });

    //   if (data.message === 'success') {
    //     navigate('/');

    // } 

  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className='p-5 max-w-xl mx-auto'>
      <h2 className='font-bold mb-3 text-xl' style={{ color: 'var(--main-color)' }}>Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
        {apierror ? <p className="text-red-500 text-xs mt-1">{apierror}</p> : null}



        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-green-600">
            Email address
          </label>
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          ) : null}
        </div>



        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-green-600">
            Password
          </label>
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          ) : null}
        </div>


        {/* Submit Button */}
        <button type="submit" className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm w-full px-5 py-2.5">
          {isloading ? <i className='fas fa-spinner fa-spin'></i> : null}
          Login
        </button>
        {/* Register Prompt */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 hover:underline font-medium">
            Register now
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login
