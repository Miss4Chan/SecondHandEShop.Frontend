import { userAuthenticated } from '../app/authenticationSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
})

export const SignUp = async (dispatch, credentials) => {
    try {
        // we sent credentials for sign in to backend as a result we get a token 
        // which we set with the dispatch(userAuthenticated(data)) to frontend
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!');
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/signin', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!');
    }
}
