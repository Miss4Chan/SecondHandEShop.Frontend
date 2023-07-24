import { useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { GetProducts, AddToCart } from '../services/products';
import { Row,Col, Button } from 'react-bootstrap';
import * as React from "react"
//hook -- vlecheme logika od serviceot 
export default () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsSlice.products);
    useEffect(()=>{
        GetProducts(dispatch);
    }, []);
    return products.map(p => 
        <div key={p.id} style={{marginBottom:'2rem'}}>
            <ListRow product={p}/>
        </div>
        );
}

const ListRow = ({ product }) => 
{
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.authenticationSlice);

    return <div>
        <Row>
            <Col>{product.id}</Col>
            <Col>{product.productName}</Col>
            <Col>{product.productType}</Col>
            <Col>{product.productSubcategory}</Col>
            <Col><Button onClick={() => AddToCart(dispatch, product, email)}>Add to Cart</Button></Col>
        </Row>
    </div>
}