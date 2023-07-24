import { setProducts,setProductSubcategories, deleteProduct, 
    editProduct,setProductSizes, newProduct, newProductError, 
    setProductsError, editProductError,setMyProducts,
    deleteProductError, addToCart, addToCartError, setProductTypes  } from '../app/productsSlice';
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
        console.log(data);
        dispatch(setProducts(data));
    } catch {
        dispatch(setProductsError());
    }
}

export const GetMyProducts = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/myProducts");
        console.log(data);
        dispatch(setMyProducts(data));
    } catch {
        dispatch(setProductsError());
    }
}

export const GetProductTypes = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productTypes");
        console.log(data);
        dispatch(setProductTypes(data));
    } catch {
        console.log("Majka ti")
    }
}

export const GetProductSizes = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productSizes");
        console.log(data);
        dispatch(setProductSizes(data));
    } catch {
        console.log("Majka ti")
    }
}
export const GetProductSubcategories = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productSubcategory");
        console.log(data);
        dispatch(setProductSubcategories(data));
    } catch {
        console.log("Majka ti")
    }
}

export const NewProduct = async (dispatch, product) => {
    try {
        console.log(product);
        const {data} = await axiosInstance.post('',product);
        console.log(data);
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
        console.log("cart");
        console.log(email);
        console.log(product);
        await axiosInstance.post('/AddToCart', {product, email});
        dispatch(addToCart(product));
    } catch {
        dispatch(addToCartError());
    }
}
