import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import { GetProductSubcategories, GetProductSizes, GetProductTypes} from '../services/products';

const ProductEdit = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const types = useSelector((state) => state.productsSlice.productTypes);
  const sizes = useSelector((state) => state.productsSlice.productSizes);
  const subcategories = useSelector((state) => state.productsSlice.productSubcategories);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

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
    <Modal show={true} onHide={onCancel}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" name="id" value={editedProduct.id} disabled />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" name="productName" value={editedProduct.productName} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Type</Form.Label>
        <Form.Select name="productType" value={editedProduct.productType} onChange={handleInputChange}>
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" name="productColor" value={editedProduct.productColor} onChange={handleInputChange} />
          </Form.Group>
      {editedProduct.productType === "Clothes" && (
        <>
          <Form.Group>
            <Form.Label>Product Size</Form.Label>
            <Form.Select name="productSize" value={editedProduct.productSize} onChange={handleInputChange}>
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Subcategory</Form.Label>
            <Form.Select name="productSubcategory" value={editedProduct.productSubcategory} onChange={handleInputChange}>
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </>
      )}
      {editedProduct.productType === "Shoes" && (
        <Form.Group>
          <Form.Label>Size number</Form.Label>
          <Form.Control type="number" name="productSizeNumber" value={editedProduct.productSizeNumber} onChange={handleInputChange} />
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="number" name="productPrice" value={editedProduct.productPrice} onChange={handleInputChange} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
    <Button variant="primary" onClick={() => onSave(editedProduct)}>Save</Button>
  </Modal.Footer>
</Modal>

  );
};

export default ProductEdit;