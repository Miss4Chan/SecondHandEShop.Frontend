import React from 'react'
import { NavLink } from 'react-router-dom';
import MyProductList from './MyProductList';

const MyProductsPage = () => (
    <div style={{ width: '60%', margin: 'auto' }}>
         <NavLink to="/add" style={{ marginLeft: '1rem' }}>Add new product</NavLink>
        <hr style={{ border: '1px solid grey' }} />
        <h4>Your Products</h4>
        <MyProductList />
    </div>
);

export default MyProductsPage;
