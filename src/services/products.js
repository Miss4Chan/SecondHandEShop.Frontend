import { setProducts, deleteProduct, editProduct, newProduct, newProductError, setProductsError, editProductError, deleteProductError, addToCart, addToCartError,  } from '../app/productsSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Products`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

//dispatch - action that triggers state change
export const GetProducts = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get();
        dispatch(setProducts(data));
    } catch {
        dispatch(setProductsError());
    }
}

export const NewProduct = async (dispatch, product) => {
    try {
        const {data} = await axiosInstance.post('',product);
        dispatch(newProduct(data));
    } catch {
        dispatch(newProductError());
    }
}

export const EditProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.put('',product);
        dispatch(editProduct(product));
    } catch {
        dispatch(editProductError());
    }
}

export const DeleteProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.delete('',{data:{...product}})
        dispatch(deleteProduct(product));
    } catch {
        dispatch(deleteProductError());
    }
}

export const AddToCart = async (dispatch, product, email) => {
    try {
        // api call
        await axiosInstance.post('/AddToCart', {product, email});
        dispatch(addToCart(product));
    } catch {
        dispatch(addToCartError());
    }
}
