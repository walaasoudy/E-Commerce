import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

function Register() {
  const { userlogin, setUserlogin }= useContext(UserContext)
  let [apierror, setapierror] = useState('');
  let [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Accept only valid Egyptian phone numbers')
      .required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  async function handleRegister(formValues) {
    setisloading(true);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
      .then(function (response) {
        if (response.data.message === 'success') {
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
    onSubmit: handleRegister,
  });

  return (
    <div className='p-5 max-w-xl mx-auto'>
      <h2 className='font-bold mb-3 text-xl' style={{ color: 'var(--main-color)' }}>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        {apierror ? <p className="text-red-500 text-xs mt-1">{apierror}</p> : null}

        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-green-600">
            Name
          </label>
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          ) : null}
        </div>

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

        {/* Phone */}
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
            Phone Number
          </label>
          {formik.touched.phone && formik.errors.phone ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
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

        {/* Confirm Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-green-600">
            Confirm password
          </label>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.rePassword}</p>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm w-full px-5 py-2.5">
          {isloading ? <i className='fas fa-spinner fa-spin'></i> : null}


          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
