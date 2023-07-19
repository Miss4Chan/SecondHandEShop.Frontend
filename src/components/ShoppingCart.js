import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import { GetShoppingCart, DeleteFromShoppingCart } from '../services/shoppingCart';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.productsSlice.cart);
  const email = useSelector((state) => state.authenticationSlice.email);

  useEffect(()=>{
      GetShoppingCart(dispatch, email);
  }, [dispatch, email]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        cartItems.map( (item) => (
          <Row style={{ marginBottom: '2rem' }}>
            <Col>{item.productName}</Col>
            <Col>{item.productDescription}</Col>
            <Col><Button onClick={() => DeleteFromShoppingCart(dispatch, email, item)}>Delete from cart</Button></Col>
          </Row>
        ))
      )}
    </div>
  );
}

export default ShoppingCart;