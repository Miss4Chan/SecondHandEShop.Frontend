import { ToastContainer } from 'react-toastify';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import React from 'react'

const HomePage = () => (
    <div style={{ width: '60%', margin: 'auto' }}>
        <ToastContainer />
        <h4>New Product</h4>
        <ProductForm />
        <hr style={{ border: '1px solid grey' }} />
        <h4>Your Products</h4>
        <ProductList/>
    </div>
);

export default HomePage;
