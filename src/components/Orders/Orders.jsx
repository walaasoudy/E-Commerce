import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading'; 

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const { getorders } = useContext(CartContext);

    async function getAllOrders() {
        try {
            const res = await getorders();
            console.log(res);
            setOrders(res.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false); 
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    if (isLoading) return <Loading />; 

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 text-center text-green-700">All Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders?.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-green-600">
                            Order ID: <span className="text-gray-800">{order._id}</span>
                        </h3>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Total Price:</span> ${order.totalOrderPrice}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Payment Method:</span> {order.paymentMethodType}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Paid:</span> {order.isPaid ? 'Yes' : 'No'}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Delivered:</span> {order.isDelivered ? 'Yes' : 'No'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
