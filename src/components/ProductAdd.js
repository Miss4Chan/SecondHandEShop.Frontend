import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, FormControl, FormLabel, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductSubcategories, GetProductSizes, GetProductTypes, GetProductConditions, NewProduct, GetProductSex } from '../services/products';
import * as React from 'react';
import { CompactPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShirt,faSocks,faGem,} from '@fortawesome/free-solid-svg-icons';

const ProductAdd = () => {
  const [name, setName] = useState('');
  const [image,setImage] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [sizeNumber, setSizeNumber] = useState(0);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const dispatch = useDispatch();

  const types = useSelector((state) => state.productsSlice.productTypes);
  const sizes = useSelector((state) => state.productsSlice.productSizes);
  const subcategories = useSelector((state) => state.productsSlice.productSubcategories);
  const conditions = useSelector((state) => state.productsSlice.productConditions);
  const sex = useSelector((state) => state.productsSlice.productSex);

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

    const fetchProductConditions = async () => {
      try {
        GetProductConditions(dispatch);
      } catch (error) {
        console.error('Error fetching product Conditions:', error);
      }
    };

    const fetchProductSex = async () => {
      try {
        GetProductSex(dispatch);
      } catch (error) {
        console.error('Error fetching product Sex:', error);
      }
    };

    fetchProductTypes();
    fetchProductSubcategories();
    fetchProductSizes();
    fetchProductConditions();
    fetchProductSex();
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
      productPrice: price,
      productBrand: brand,
      productMaterial: material,
      productCondition: selectedCondition,
      productSex : selectedSex,
      productImage : image
    });

    setShowPopup(false);
    setName('');
    setImage('');
    setColor('#ffffff');
    setSizeNumber(0);
    setSelectedProductType('');
    setSelectedSize('');
    setSelectedSubcategory('');
    setPrice(0);
    setBrand('');
    setMaterial('');
    setSelectedCondition('');
  };

  const handleCancelClick = () => {
    setSelectedProductType('');
    setSelectedSize('');
    setSelectedSubcategory('');
    setSelectedCondition('');
    setShowPopup(false);
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const [selectedIcon, setSelectedIcon] = useState('');

  
  const productTypeIcons = {
    Clothes:faShirt ,
    Shoes: faSocks,
    Accessories: faGem
    // Add more product types and icons as needed
  };

  const highlightClass = `
  .product-type-icon.highlight {
    border: 7px solid #000000;
    margin: 500px; /* Add margin here to create space around the highlighted icon */
  }
`;

  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh', // Set the minimum height to fill the viewport
      }}
    >
    <Form>
      <Row>
        <Col>
        <FormLabel style={{ marginBottom: '60px', fontSize: '30px', fontWeight: 'bold' }}>Select the Type of Product You Would Like to Add</FormLabel>
          <div className="product-type-icons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          {Object.keys(productTypeIcons).map((type) => (
        <FontAwesomeIcon
      key={type}
      icon={productTypeIcons[type]}
      size="8x" 
      className={`product-type-icon ${selectedProductType === type ? 'highlight' : ''}`}
      onClick={() => setSelectedProductType(type)}
      style={{
        cursor: 'pointer',
        margin: '0 40px',
        marginBottom: '40px' 
      }}
    />
  ))}
  <style>{highlightClass}</style>
</div>
              </Col>
            </Row>


            {selectedProductType && (
            <Modal show={showPopup} onHide={handleCancelClick}>
                <Modal.Header closeButton>
          <Modal.Title>{selectedProductType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>

        <Row>
            <Col>
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter link to image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </Col>
          </Row>
              <Row>
                  <Col>
                    <FormLabel>Brand</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(event) => setBrand(event.target.value)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormLabel>Material</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter material"
                      value={material}
                      onChange={(event) => setMaterial(event.target.value)}
                    />
                  </Col>
                </Row>
            <Col>
              
              <select
                name="productSex"
                value={selectedSex}
                onChange={(event) => setSelectedSex(event.target.value)}
              >
                <option value="">Gender</option>
                {sex.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormLabel>
               
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="color-tooltip">Choose the most dominant color of your product</Tooltip>}
                >
                  <span style={{ fontSize: '18px', cursor: 'pointer' }}></span>
                </OverlayTrigger>
              </FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: color,
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
                  <CompactPicker color={color} onChange={handleColorChange} />
                </div>
              )}
            </Col>
          </Row>

          

          <Row>
            <Col>
              <FormLabel>Condition</FormLabel>
              <select
                name="productCondition"
                value={selectedCondition}
                onChange={(event) => setSelectedCondition(event.target.value)}
              >
                <option value="">Select Condition</option>
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          {selectedProductType === 'Clothes' && (
            <>
              <Row>
                <Col>
                  <FormLabel>Size</FormLabel>
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
              </Row>

              <Row>
                <Col>
                  <FormLabel>Subcategory</FormLabel>
                  <select
                    name="productSubcategories"
                    value={selectedSubcategory}
                    onChange={(event) => setSelectedSubcategory(event.target.value)}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </>
          )}

          {selectedProductType === 'Shoes' && (
            <Row>
              <Col>
                <FormLabel>Size Number</FormLabel>
                <FormControl
                  type="number"
                  placeholder="Enter size number"
                  value={sizeNumber}
                  onChange={(event) => setSizeNumber(event.target.value)}
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
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <span style={{ marginLeft: '5px' }}>MKD</span>
            </div>
          </Col>
        </Row>
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
            )}

     
<Row>
  <Col>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button
        onClick={() => {
          if (selectedProductType) {
            setShowPopup(true);
          }
        }}
        size="lg"
        style={{ backgroundColor: 'black', fontSize: '20px',fontWeight: 'bold', padding: '15px 30px' }} // Adjust the values as needed
      >
        Add Product
      </Button>
    </div>
  </Col>
</Row>

    </Form>
    </div>
  );
};

export default ProductAdd;
