import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import { GetFavourites, DeleteFromFavourites } from '../services/favourites';

const Favourites = () => {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.productsSlice.favourites);
  const email = useSelector((state) => state.authenticationSlice.email);

  useEffect(()=>{
      GetFavourites(dispatch, email);
  }, [dispatch, email]);

  return (
    <div>
      <h2>favourites</h2>
      {favourites.length === 0 ? (
        <p>Your faves is empty.</p>
      ) : (
        favourites.map( (item) => (
          <Row style={{ marginBottom: '2rem' }}>
            <Col>{item.productName}</Col>
            <Col><Button onClick={() => DeleteFromFavourites(dispatch, email, item)}>Delete from favourites</Button></Col>
          </Row>
        ))
      )}
    </div>
  );
}

export default Favourites;