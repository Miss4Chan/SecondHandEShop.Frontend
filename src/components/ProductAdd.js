import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, FormControl, FormLabel, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductSubcategories, GetProductSizes, GetProductTypes, NewProduct } from '../services/products';
import * as React from 'react';

const ProductAdd = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [sizeNumber, setSizeNumber] = useState(0);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [price, setPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleFormSubmit = (event) => {
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

    // Close the popup and reset form fields and dropdown menus
    setShowPopup(false);
    setName('');
    setColor('');
    setSizeNumber(0);
    setSelectedProductType('');
    setSelectedSize('');
    setSelectedSubcategory('');
    setPrice(0);
  };

  const handleCancelClick = () => {
    // Reset the selected values for the dropdown menus to an empty string
    setSelectedProductType('');
    setSelectedSize('');
    setSelectedSubcategory('');

    // Hide the popup
    setShowPopup(false);
  };

  return (
    <Form>
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
      </Row>

      <Modal show={showPopup} onHide={handleCancelClick}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProductType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProductType === 'Clothes' && (
            <>
              <FormLabel>Color</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
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
            </>
          )}
          {selectedProductType === 'Shoes' && (
            <>
              <FormLabel>Size number</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter size number"
                value={sizeNumber}
                onChange={(event) => setSizeNumber(event.target.value)}
              />
            </>
          )}
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <FormLabel>Price</FormLabel>
          <FormControl
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col>
          <div>
            <Button
              variant="primary"
              onClick={() => {
                // Open the popup when a type is selected
                if (selectedProductType) {
                  setShowPopup(true);
                }
              }}
            >
              Add Product
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductAdd;
