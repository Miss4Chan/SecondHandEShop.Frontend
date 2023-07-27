import axios from 'axios';
import {setMyOrders } from '../app/userSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Order`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetMyOrders = async (dispatch, username) => {
    try {
        const {data} = await axiosInstance.get('/myOrders',{ params: { username } });
        console.log("data")
        console.log(data)
        dispatch(setMyOrders(data));

    } catch {
        console.log("Error so my orders");
    }
}
