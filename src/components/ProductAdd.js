import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, FormControl, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductSubcategories, GetProductSizes, GetProductTypes, NewProduct} from '../services/products';
import * as React from 'react';

const ProductAdd = () => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [sizeNumber, setSizeNumber] = useState(0);
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [price, setPrice] = useState(0);
  
    const dispatch = useDispatch();
  
    const types = useSelector((state) => state.productsSlice.productTypes);
    const sizes = useSelector((state) => state.productsSlice.productSizes);
    const subcategories = useSelector((state) => state.productsSlice.productSubcategories);

    useEffect(() => {
      const fetchProductTypes = async () => {
        try {
          GetProductTypes(dispatch);
        } catch (error) {
          console.error('Error fetching product types:', error);
        }
      };

      const fetchProductSizes = async () => {
        try {
          GetProductSizes(dispatch);
        } catch (error) {
          console.error('Error fetching product sizes:', error);
        }
      };
  
      const fetchProductSubcategories = async () => {
        try {
          GetProductSubcategories(dispatch);
        } catch (error) {
          console.error('Error fetching product subcategories:', error);
        }
      };

      fetchProductTypes();
      fetchProductSubcategories();
      fetchProductSizes();
    }, [dispatch]);
  
    return (
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          NewProduct(dispatch, {
            productType: selectedProductType,
            productColor: color,
            productSizeNumber: sizeNumber,
            productName: name,
            productSize: selectedSize,
            productSubcategory: selectedSubcategory,
            productPrice: price
          });
        }}
      >
        <Row>
          <Col>
            <FormLabel>Type</FormLabel>
            {types ? (
              <select
                name="productType"
                value={selectedProductType}
                onChange={(event) => setSelectedProductType(event.target.value)}
              >
                <option value="">Select Type</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : (
              <p>Loading product types...</p>
            )}
          </Col>
          {selectedProductType && ( 
            <>
              <Col>
                <FormLabel>Color</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter color"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                />
              </Col>
              {selectedProductType === "Clothes" && ( 
                <Col>
                  <select
                    name="productSize"
                    value={selectedSize}
                    onChange={(event) => setSelectedSize(event.target.value)}
                  >
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </Col>
              )}
            {selectedProductType === "Clothes" && ( 
                <Col>
                  <select
                    name="productSubcategories"
                    value={selectedSubcategory}
                    onChange={(event) => setSelectedSubcategory(event.target.value)}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </Col>
              )}
              {selectedProductType === "Shoes" && (
                <Col>
                <FormLabel>Size number</FormLabel>
                <FormControl
                  type="number"
                  placeholder="Enter size number"
                  value={sizeNumber}
                  onChange={(event) => setSizeNumber(event.target.value)}
                />
              </Col>
              )}    
                <Col>
                <FormLabel>Name</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Col>
              <Col>
                <FormLabel>Price</FormLabel>
                <FormControl
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </Col>
              <Col>
                <div>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Form>
    );
  };
  
  export default ProductAdd;