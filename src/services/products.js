import { setProducts, deleteProduct, editProduct, newProduct } from '../app/productsSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://localhost:44314/Products",
})
//dispatch - action that triggers state change
export const GetProducts = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get();
        dispatch(setProducts(data))
    } catch {
        console.log("Error")
    }
}

export const NewProduct = async (dispatch, product) => {
    try {
        const {data} = await axiosInstance.post('',product);
        dispatch(newProduct(data));
    } catch {
        console.log('Error')
    }
}

export const EditProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.put('',product);
        dispatch(editProduct(product));
    } catch {
        console.log("ERROROROROOROR")
    }
}

export const DeleteProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.delete('',{data:{...product}})
        dispatch(deleteProduct(product));
    } catch {
        console.log("ERROROROROOROR")
    }
}
