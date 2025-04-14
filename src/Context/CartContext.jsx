import axios from "axios";
import { createContext, useContext } from "react";

export let CartContext = createContext(0);

export default function CartProvider(props) {

    let token = {
        token: localStorage.getItem('userToken')
    }
    function getCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: token
            }
        )
    }
    function addtocart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId: id
            },
            {
                headers: token
            }
        )
    }

    function removeCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                headers: token
            }
        )
    }

    function updateCartItemCount(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                count
            },
            {
                headers: token
            }
        )
    }
    function checkOut(cartId, url, formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: formValues

            },
            {
                headers: token
            }
        )
    }
    function getorders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders`, { headers: token })
            .then(res => res)
            .catch(err => err)
    }
    return (
        <CartContext.Provider value={{
            addtocart,
            getCart,
            removeCartItem,
            updateCartItemCount,
            checkOut,
            getorders
        }}>
            {props.children}
        </CartContext.Provider>
    )
}