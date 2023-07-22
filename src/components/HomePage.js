import { Button } from 'react-bootstrap';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import React from 'react'
import { NavLink } from 'react-router-dom';
const HomePage = () => (
    <div style={{ width: '60%', margin: 'auto' }}>
         <NavLink to="/add" style={{ marginLeft: '1rem' }}>Add new product</NavLink>
        <hr style={{ border: '1px solid grey' }} />
        <h4>Your Products</h4>
        <ProductList/>
    </div>
);

export default HomePage;
