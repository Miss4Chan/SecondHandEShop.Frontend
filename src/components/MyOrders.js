import { useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { GetProducts, AddToCart, AddToFavourites } from '../services/products';
import { Row,Col, Button } from 'react-bootstrap';
import * as React from "react"
import { NavLink } from 'react-router-dom';
import { GetMyOrders } from '../services/order';
//hook -- vlecheme logika od serviceot 
export default () => {
    const dispatch = useDispatch();
    const myOrders = useSelector(state => state.userSlice.myOrders);
    console.log(myOrders)
    const email = useSelector((state) => state.authenticationSlice.email);

    useEffect(()=>{
        GetMyOrders(dispatch,email);
    }, []);
    return myOrders.map(o => 
        <div key={o.id} style={{marginBottom:'2rem'}}>
            <OrderDetails order={o}/>
        </div>
        );
}

const OrderDetails = ({ order }) => {
    console.log(order);
    console.log(order.productsInOrder)
    return (
      <div>
        {order && (
          <div>
            <h2>Id: {order.id}</h2>
          </div>
        )}
        {order && order.productsInOrder && order.productsInOrder.length > 0 ? (
          order.productsInOrder.map((item) => (
            <Row style={{ marginBottom: '2rem' }}>
              <Col>{item.product.productName}</Col>
              <Col>{item.product.productPrice}</Col>
            </Row>
          ))
        ) : (
          <p>lol prazno e</p>
        )}
      </div>
    );
  };
  