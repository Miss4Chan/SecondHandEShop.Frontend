import axios from 'axios';
import { setShoppingCart, deleteFromShoppingCart, setShoppingCartError, deleteFromShoppingCartError, clearCart } from '../app/productsSlice';
import { newOrder } from '../app/userSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/ShoppingCart`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetShoppingCart = async (dispatch, email) => {
    try {
        //api call
        const {data} = await axiosInstance.get('',{ params: { email } });
        console.log("data")
        console.log(data)
       // const products = data.productsInShoppingCart.map(p => p.product);
        //dispatch(setShoppingCart(products));
        dispatch(setShoppingCart(data));
     //   dispatch(setTotalPrice(data.totalPrice));

    } catch {
        dispatch(setShoppingCartError());
    }
}

export const DeleteFromShoppingCart = async (dispatch, email, product) => {
    try {
        await axiosInstance.delete(`?email=${email}&product=${product.id}`)
        dispatch(deleteFromShoppingCart(product));
    } catch {
        dispatch(deleteFromShoppingCartError());
    }
}

export const OrderNow = async (dispatch, email) => {
    try {
        console.log("ORDER NOW")
        const order = await axiosInstance.get(`\Order?email=${email}`);
        console.log("order from backend")
        console.log(order);
        dispatch(clearCart());
        dispatch(newOrder(order));

    } catch {
        console.log("Error ordering")
    }
}