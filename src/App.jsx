import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Brand from './components/Brand/Brand'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Categories from './components/Categories/Categories'
import 'flowbite';
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Product from './components/Product/Product'





import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'





function App() {
  // Create a client
  const queryClient = new QueryClient()
  let router = createBrowserRouter(
    [
      {
        path: '', element: <Layout />, children: [
          { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
          
          { path: '/checkout', element: <ProtectedRoute><Checkout /> </ProtectedRoute> },
          { path: '/cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
          { path: '/products', element: <ProtectedRoute><Products /> </ProtectedRoute> },
          { path: '/allorders', element: <ProtectedRoute><Orders /> </ProtectedRoute> },

          { path: '/productdetails/:id', element: <ProtectedRoute><Product /> </ProtectedRoute> },
          { path: '/brand', element: <ProtectedRoute> <Brand /></ProtectedRoute> },
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
          { path: 'categories', element: <ProtectedRoute> <Categories /></ProtectedRoute> },
          { path: '*', element: <ProtectedRoute> <NotFound /></ProtectedRoute> }  // Default route

        ]
      }
    ]
  )


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartProvider>
            <RouterProvider router={router} ></RouterProvider>

            <ReactQueryDevtools />
            <Toaster />
          </CartProvider>
        </UserContextProvider>
      </QueryClientProvider>






    </>
  )
}

export default App
