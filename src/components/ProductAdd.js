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
  const [description, setDescription] = useState('');
  const [measurements, setMeasurements] = useState('');
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
  const [errors, setErrors] = useState({});
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

  const formatFieldName = (fieldName) => {
    // Split the fieldName by capital letters and join with spaces
     return fieldName.replace(/([A-Z])/g, ' $1') // Insert space before capital letters
                  .split(/(?=[A-Z])/) // Split words at capital letters
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const mandatoryFields = {
      name,
      selectedSex,
      selectedCondition,
      image
    };

    if (selectedProductType === 'Shoes') {
      mandatoryFields.sizeNumber = sizeNumber;
    } else if (selectedProductType === 'Clothes') {
      mandatoryFields.selectedSize = selectedSize;
      mandatoryFields.selectedSubcategory = selectedSubcategory;
    }

    mandatoryFields.price = price;

    const newErrors = {};
    Object.keys(mandatoryFields).forEach((field) => {
      if (!mandatoryFields[field]) {
        let fieldName = field.replace(/^selected/, ''); // Remove 'selected' from field name
        fieldName = formatFieldName(fieldName); // Format field name using the function
        newErrors[field] = `${fieldName} is required.`;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
      productImage : image,
      productDescription: description,
      productMeasurements: measurements
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
    setDescription('');
    setMeasurements('');
  };

  const handleCancelClick = () => {
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
    setDescription('');
    setMeasurements('');
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };
 
  const clearErrors = () => {
    setErrors({});
  };
  
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

const styles = `
.error-container {
  color: red;
  margin-bottom: 20px;
  margin-left: 20px;
}

.error-message {
  margin-top: 5px;
}

.input-field {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-field label {
  flex: 1;
  font-weight: bold;
  margin-right: 10px;
}

.input-field input,
.input-field select {
  flex: 2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
      <style>{styles}</style>
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
      onClick={() => {
        clearErrors();
        handleCancelClick();
        setSelectedProductType(type)}}
      style={{
        cursor: 'pointer',
        margin: '0 40px',
        marginBottom: '40px' 
      }}
      disabled={!selectedProductType} 
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
   
        <Row className="input-field">
            <Col>
              <FormLabel>Product Name
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                />
            </Col>
          </Row>
          
          <Row className="input-field">
            <Col>
              <FormLabel>Product Description</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter product description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Col>
          </Row>

        <Row className="input-field">
            <Col>
            <FormLabel>Product Sex
            <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
            </FormLabel>
              <select
                name="productSex"
                value={selectedSex}
                onChange={(event) => setSelectedSex(event.target.value)}
                required
              >
                <option value="">Select product sex</option>
                {sex.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row className="input-field">
            <Col>
              <FormLabel>Product Condition
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
              <select
                name="productCondition"
                value={selectedCondition}
                onChange={(event) => setSelectedCondition(event.target.value)}
                required
              >
                <option value="">Select product condition</option>
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

        <Row className="input-field">
                  <Col>
                    <FormLabel>Product Brand</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter product brand"
                      value={brand}
                      onChange={(event) => setBrand(event.target.value)}
                    />
                  </Col>
        </Row>

        <Row className="input-field">
            <Col>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginRight: '10px',
                    border: '1px solid black',
                  }}
                />
                <Button variant="dark" onClick={() => setShowColorPicker(true)}>Product Color</Button>
                <FormLabel>
               
               <OverlayTrigger
                 placement="right"
                 overlay={<Tooltip id="color-tooltip">Choose the most dominant color of your product</Tooltip>}
               >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}>?</span>
               </OverlayTrigger>
             </FormLabel>
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

          <Row className="input-field">
            <Col>
              <FormLabel>Product Image 
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter link to product image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                required
                />
            </Col>
          </Row>

          {selectedProductType === 'Clothes' && (
            <>
              <Row className="input-field">
                <Col>
                  <FormLabel>Product Size
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
                  </FormLabel>
                  <select
                    name="productSize"
                    value={selectedSize}
                    onChange={(event) => setSelectedSize(event.target.value)}
                    required={selectedProductType === 'Clothes'}
                  >
                    <option value="">Select product size</option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row className="input-field">
                <Col>
                  <FormLabel>Product Subcategory
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
                  </FormLabel>
                  <select
                    name="productSubcategories"
                    value={selectedSubcategory}
                    onChange={(event) => setSelectedSubcategory(event.target.value)}
                    required={selectedProductType === 'Clothes'}
                  >
                    <option value="">Select product subcategory</option>
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
            <Row className="input-field">
              <Col>
                <FormLabel>Product Size Number
                <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
                </FormLabel>
                <FormControl
                  type="number"
                  placeholder="Enter product size number"
                  value={sizeNumber}
                  onChange={(event) => setSizeNumber(event.target.value)}
                  required={selectedProductType === 'Shoes'}
              />
              </Col>
            </Row>
          )}

        
          <Row className="input-field"> 
                  <Col>
                    <FormLabel>Product Measurements
                    <OverlayTrigger
                 placement="right"
                 overlay={<Tooltip>Enter detailed measurements for the product in cm</Tooltip>}
               >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}>?</span>
               </OverlayTrigger>
                    </FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter product measurements"
                      value={measurements}
                      onChange={(event) => setMeasurements(event.target.value)}
                    />
                  </Col>
          </Row>

          <Row className="input-field">
                  <Col>
                    <FormLabel>Product Material</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter product material"
                      value={material}
                      onChange={(event) => setMaterial(event.target.value)}
                    />
                  </Col>
                </Row>
          
                <Row className="input-field">
          <Col>
            <FormLabel>Product Price (MKD) 
            <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
            </FormLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FormControl
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>
          </Col>
        </Row>
          
        </Modal.Body>

        <div className="error-container">
        {Object.keys(errors).map((field) => (
          <div key={field} className="error-message">
            {errors[field]}
          </div>
        ))}
      </div>
        <Modal.Footer>
      <Button variant="secondary" onClick={handleCancelClick}>
        Cancel
      </Button>
      <Button variant="dark" onClick={handleFormSubmit}>
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
        style={{      backgroundColor: 'black',
        fontSize: '20px',
        fontWeight: 'bold',
        padding: '15px 30px',
        color: 'white',
        border: 'none',
        outline: 'none',
        cursor: selectedProductType ? 'pointer' : 'not-allowed',
        // Customize style for disabled button
        opacity: selectedProductType ? 1 : 0.6, // Adjust opacity for disabled state
        filter: selectedProductType ? 'none' : 'grayscale(100%)', // Apply grayscale filter for disabled state
      }}
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
