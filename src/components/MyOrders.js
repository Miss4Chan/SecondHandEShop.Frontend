import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import * as React from 'react';
import { GetMyOrders } from '../services/order';
import { AddComment } from '../services/comments';

export default () => {
  const dispatch = useDispatch();
  const myOrders = useSelector((state) => state.userSlice.myOrders);
  const email = useSelector((state) => state.authenticationSlice.email);

  console.log(myOrders);

  useEffect(() => {
    GetMyOrders(dispatch, email);
  }, []);

  return myOrders.map((o) => (
    <div key={o.id} style={{ marginBottom: '2rem' }}>
      <OrderDetails order={o} />
    </div>
  ));
};

const OrderDetails = ({ order }) => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const email = useSelector((state) => state.authenticationSlice.email);
  const commenterUsername = email;
  const dispatch = useDispatch();

  const handleOpenCommentPopup = (productId) => {
    setSelectedProduct(productId);
    setShowCommentPopup(true);
  };

  const handleCommentSubmit = () => {
    const selectedProductItem = order.productsInOrder.find(
      (item) => item.product.id === selectedProduct
    );

    if (!selectedProductItem) {
      console.error('Selected product not found.');
      return;
    }

    const receiverUsername = selectedProductItem.product.shopApplicationUser.email;

    const commentData = {
      Content: comment,
      CommenterUsername: commenterUsername,
      ReceiverUsername: receiverUsername,
    };

    AddComment(dispatch, commentData, rating)
      .then((addedComment) => {
        console.log('Comment added:', addedComment);
        setShowCommentPopup(false); 
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => handleRatingSelect(i)}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      {order && (
        <div>
          <h2>Id: {order.id}</h2>
        </div>
      )}
      {order && order.productsInOrder && order.productsInOrder.length > 0 ? (
        order.productsInOrder.map((item) => (
          <Row key={item.product.id} style={{ marginBottom: '2rem' }}>
            <Col>{item.product.productName}</Col>
            <Col>{item.product.productPrice}</Col>
            <Col>
              <Button
                variant="primary"
                onClick={() => handleOpenCommentPopup(item.product.id)}
              >
                Leave a Comment
              </Button>
            </Col>
          </Row>
        ))
      ) : (
        <p>Error loading the order</p>
      )}

      <Modal
        show={showCommentPopup && selectedProduct !== null}
        onHide={() => {
          setShowCommentPopup(false);
          setSelectedProduct(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Leave a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <div>
            {renderStarRating()}
            {rating !== 0 && <p>Selected Rating: {rating}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommentPopup(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCommentSubmit}>
            Submit Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
