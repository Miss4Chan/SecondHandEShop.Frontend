import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { GetShoppingCart, DeleteFromShoppingCart, OrderNow } from '../services/shoppingCart';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.productsSlice.cart);
  const totalPrice = useSelector(state => state.productsSlice.totalPrice);
  const email = useSelector((state) => state.authenticationSlice.email);

  useEffect(() => {
    GetShoppingCart(dispatch, email);
  }, [dispatch, email]);

  const [showModal, setShowModal] = useState(false);

  const handleOrderNow = () => {
    setShowModal(true);
  };

  const confirmOrder = () => {
    OrderNow(dispatch, email);
    setShowModal(false);
    navigate('/narachki');
  };

  const cancelOrder = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
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
              <Button onClick={handleOrderNow}>Order Now</Button>
            </Col>
          </Row>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place the order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelOrder}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmOrder}>
            Order Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShoppingCart;
