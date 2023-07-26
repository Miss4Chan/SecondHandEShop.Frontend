import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import { GetShoppingCart, DeleteFromShoppingCart, OrderNow } from '../services/shoppingCart';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.productsSlice.cart);
  const totalPrice = useSelector(state => state.productsSlice.totalPrice);
  const email = useSelector((state) => state.authenticationSlice.email);

  useEffect(()=>{
      GetShoppingCart(dispatch, email);
      console.log("fetch from backend")
  }, [dispatch, email]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
          {cartItems.map( (item) => (
            <Row style={{ marginBottom: '2rem' }}>
              <Col>{item.productName}</Col>
              <Col>{item.productPrice}</Col>
              <Col><Button onClick={() => DeleteFromShoppingCart(dispatch, email, item)}>Delete from cart</Button></Col>
            </Row>
          ))}
          <Row style={{ fontWeight: 'bold' }}>
            <Col>Total Price:</Col>
            <Col>{totalPrice}</Col>
            <Col>
            <Button onClick={() => OrderNow(dispatch, email)}>Order Now</Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
