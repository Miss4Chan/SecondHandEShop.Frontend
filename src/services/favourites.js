import axios from 'axios';
import { setFavourites, deleteFromFavourites } from '../app/productsSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Favourites`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetFavourites = async (dispatch, email) => {
    try {
        //api call
        const {data} = await axiosInstance.get('',{ params: { email } });
        const products = data.productsInFavourites.map(p => p.product);
        dispatch(setFavourites(products));

    } catch {
        console.log("Error")
    }
}

export const DeleteFromFavourites = async (dispatch, email, product) => {
    try {
        await axiosInstance.delete(`?email=${email}&product=${product.id}`)
        dispatch(deleteFromFavourites(product));
    } catch {
        console.log("Error!")
    }
}