import { ActionCreators } from '../app/productReducer';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://localhost:44314/Products",
})
//dispatch - action that triggers state change
export const GetProducts = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setProduct(data))
    } catch {
        console.log("error")
    }
}

export const NewProduct = async (dispatch, product) => {
    try {
        const {data} = await axiosInstance.post('',product);
        dispatch(ActionCreators.newProduct(data));
    } catch {
        console.log('Error')
    }
}

export const EditProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.put('',product);
        dispatch(ActionCreators.editProduct(product));
    } catch {
        console.log("ERROROROROOROR")
    }
}

export const DeleteProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.delete('',{data:{...product}})
        dispatch(ActionCreators.deleteProduct(product));
    } catch {
        console.log("ERROROROROOROR")
    }
}
