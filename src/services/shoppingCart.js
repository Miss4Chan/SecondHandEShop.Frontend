import axios from 'axios';
import { setShoppingCart, deleteFromShoppingCart, setShoppingCartError, deleteFromShoppingCartError } from '../app/productsSlice';

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
        console.log(email);
        const {data} = await axiosInstance.get('',{ params: { email } });
        console.log(data);
        const products = data.productsInShoppingCart.map(p => p.product);
        dispatch(setShoppingCart(products));

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