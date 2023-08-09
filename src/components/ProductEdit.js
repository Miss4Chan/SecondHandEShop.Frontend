import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, FormControl, FormLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { GetProductSubcategories, GetProductSizes, GetProductConditions, GetProductSex } from '../services/products';
import { CompactPicker } from 'react-color';

const ProductEdit = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const sizes = useSelector((state) => state.productsSlice.productSizes);
  const subcategories = useSelector((state) => state.productsSlice.productSubcategories);
  const conditions = useSelector((state) => state.productsSlice.productConditions);
  const sex = useSelector((state) => state.productsSlice.productSex);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  useEffect(() => {
    const fetchProductConditions = async () => {
      try {
        GetProductConditions(dispatch);
      } catch (error) {
        console.error('Error fetching product Conditions:', error);
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

    
    const fetchProductSex = async () => {
      try {
        GetProductSex(dispatch);
      } catch (error) {
        console.error('Error fetching product Sex:', error);
      }
    };

    fetchProductSubcategories();
    fetchProductSizes();
    fetchProductConditions();
    fetchProductSex();
  }, [dispatch]);

  const handleColorChange = (selectedColor) => {
    setEditedProduct({ ...editedProduct, productColor: selectedColor.hex });
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <FormLabel>Product Name</FormLabel>
              <FormControl
                type="text"
                name="productName"
                value={editedProduct.productName}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormLabel>Product Description</FormLabel>
              <FormControl
                type="text"
                name="productDescription"
                value={editedProduct.productDescription}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormLabel>Product Image</FormLabel>
              <FormControl
                type="text"
                name="productImage"
                value={editedProduct.productImage}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormLabel>Product Type</FormLabel>
              <Form.Control type="text" name="productType" value={editedProduct.productType} disabled />
            </Col>
          </Row>

          <Row>
                <Col>
                  <FormLabel>Product Condition</FormLabel>
                  <Form.Select
                    name="productCondition"
                    value={editedProduct.productCondition}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Product Condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormLabel>Product Sex</FormLabel>
                  <Form.Select
                    name="productSex"
                    value={editedProduct.productSex}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sex</option>
                    {sex.map((sex) => (
                      <option key={sex} value={sex}>
                        {sex}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

          <Row>
            <Col>
              <FormLabel>Color</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: editedProduct.productColor,
                    marginRight: '10px',
                  }}
                />
                <Button onClick={() => setShowColorPicker(true)}>Choose Color</Button>
              </div>
              {showColorPicker && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="danger" onClick={handleCloseColorPicker}>
                      X
                    </Button>
                  </div>
                  <CompactPicker color={editedProduct.productColor} onChange={handleColorChange} />
                </div>
              )}
            </Col>
          </Row>

          {editedProduct.productType === 'Clothes' && (
            <>
              <Row>
                <Col>
                  <FormLabel>Product Size</FormLabel>
                  <Form.Select
                    name="productSize"
                    value={editedProduct.productSize}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormLabel>Product Subcategory</FormLabel>
                  <Form.Select
                    name="productSubcategory"
                    value={editedProduct.productSubcategory}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </>
          )}

          {editedProduct.productType === 'Shoes' && (
            <Row>
              <Col>
                <FormLabel>Size number</FormLabel>
                <FormControl
                  type="number"
                  name="productSizeNumber"
                  value={editedProduct.productSizeNumber}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          )}

          <Row>
        <Col>
          <FormLabel>Price (MKD)</FormLabel>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl
              type="number"
              name="productPrice"
              value={editedProduct.productPrice}
              onChange={handleInputChange}
            />
            <span style={{ marginLeft: '5px' }}>MKD</span>
          </div>
        </Col>
      </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave(editedProduct)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductEdit;
