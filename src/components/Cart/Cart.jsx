import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';



function Cart() {
  const navigate = useNavigate();
  const { getCart, removeCartItem, updateCartItemCount } = useContext(CartContext);
  async function displayCart() {
    let res = await getCart();
    console.log(res.data)
    return res.data.data;
   
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['cartData'],
    queryFn: displayCart,
    refetchInterval: 1000,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error fetching cart data. Please try again later.</div>;
  if (!data) return <div>No data available.</div>;

  // Handle Remove Item
  const handleRemove = (id) => {
    removeCartItem(id).then(() => {
      // Optionally refetch cart after removing item
    }).catch((err) => console.error('Error removing item:', err));
  };
console.log(data)
  // Handle Update Item Quantity
  const handleUpdateQuantity = (id, count) => {
    if (count <= 0) {
      handleRemove(id);
    }
    // Avoid setting the count to zero or negative
    updateCartItemCount(id, count).then(() => {
      // Optionally refetch cart after updating item count
    }).catch((err) => console.error('Error updating item count:', err));
    
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Cart Title */}
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {/* Cart Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 md:w-32 max-w-full max-h-full"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {/* Decrease Quantity */}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-1 me-3 h-6 w-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                      </svg>
                    </button>
                    {/* Display Quantity */}
                    <input
                      type="number"
                      value={item.count}
                      className="w-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-2.5 py-1 focus:ring-blue-500 focus:border-blue-500"
                      readOnly
                    />
                    {/* Increase Quantity */}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
        <Link to="/checkout">
          <button className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Checkout
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Cart;
