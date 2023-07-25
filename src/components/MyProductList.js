import { useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { GetMyProducts } from '../services/products';
import { Row,Col, Button } from 'react-bootstrap';
import * as React from "react"
import ProductEdit from './ProductEdit';
import { EditProduct, DeleteProduct } from '../services/products';

//hook -- vlecheme logika od serviceot 
export default () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsSlice.myProducts);
    useEffect(()=>{
        GetMyProducts(dispatch);
    }, []);
    return products.map(p => 
        <div key={p.id} style={{marginBottom:'2rem'}}>
            <ListRow product={p}/>
        </div>
        );
}

const ListRow = ({ product }) => 
{
    const [isEditing,setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const handleSave = (editedProduct) => {
        EditProduct(dispatch, { id: editedProduct.id, productColor: editedProduct.productColor, productSizeNumber: editedProduct.productSizeNumber, productName: editedProduct.productName, productPrice: editedProduct.productPrice, productType: editedProduct.productType, productSubcategory: editedProduct.productSubcategory, productSize: editedProduct.productSize });
        setIsEditing(false);
      };
    return (
        <div>
      {isEditing ? (
        <ProductEdit product={product} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      ) : (
        <Row>
          <Col>{product.id}</Col>
          <Col>{product.productName}</Col>
          <Col>{product.productType}</Col>
          <Col>{product.productSubcategory}</Col>
          <Col>{product.productPrice}</Col>
          <Col>{product.username}</Col>
          <Col>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </Col>
          <Col>
          <Button variant="danger" onClick={() => DeleteProduct(dispatch, product)}>Delete</Button>
          </Col>
        </Row>
      )}
    </div>
    )
}