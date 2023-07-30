import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts, AddToCart, AddToFavourites, GetProductConditions, GetProductSizes } from '../services/products';
import { Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import * as React from "react"
import { NavLink } from 'react-router-dom';
import { CompactPicker } from 'react-color';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsSlice.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [sortByUserRating, setSortByUserRating] = useState('');
  const sizes = useSelector((state) => state.productsSlice.productSizes);
  const conditions = useSelector((state) => state.productsSlice.productConditions);
  const [selectedColor, setSelectedColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const selectedType = useSelector(state => state.productsSlice.selectedType);
  const selectedSex = useSelector(state => state.productsSlice.selectedSex);
  const selectedSubcategory = useSelector(state => state.productsSlice.selectedSubcategory);
  const isClothesType = selectedType === 'Clothes';
  const isShoesType = selectedType === 'Shoes';
  const [shoeNumberRange, setShoeNumberRange] = useState('');

  useEffect(() => {
    GetProducts(dispatch, selectedType, selectedSex, selectedSubcategory, searchTerm, selectedColor, sizeFilter, conditionFilter, sortByPrice, sortByUserRating, shoeNumberRange);

    const fetchProductSizes = async () => {
      try {
        GetProductSizes(dispatch);
      } catch (error) {
        console.error('Error fetching product sizes:', error);
      }
    };

    const fetchProductConditions = async () => {
      try {
        GetProductConditions(dispatch);
      } catch (error) {
        console.error('Error fetching product Conditions:', error);
      }
    };

    fetchProductSizes();
    fetchProductConditions();
  }, [dispatch, selectedType, selectedSex, selectedSubcategory]);

  const handleColorChange = (selectedColor) => {
    setSelectedColor(selectedColor.hex);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleRemoveFilters = () => {
    // Reset all the filter states to their initial values
    setSearchTerm('');
    setSizeFilter('');
    setConditionFilter('');
    setSortByPrice('');
    setSortByUserRating('');
    setSelectedColor('');
    setShowColorPicker(false);
    GetProducts(dispatch, selectedType, selectedSex, selectedSubcategory);
  };

  return (
    <div>
      {/* Filter and sort controls */}
      <Form>
        <Row>
          <Col>
            <FormControl
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Col>
          <Col>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: selectedColor,
                  marginRight: '10px',
                }}
              />
              <Button onClick={() => setShowColorPicker(true)}>Filter by Color</Button>
            </div>
            {showColorPicker && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="danger" onClick={handleCloseColorPicker}>
                    X
                  </Button>
                </div>
                <CompactPicker color={selectedColor} onChange={handleColorChange} />
              </div>
            )}
          </Col>
          {isClothesType && (
            <Col>
              <FormControl
                as="select"
                value={sizeFilter}
                onChange={(event) => setSizeFilter(event.target.value)}
              >
                <option value="">All Sizes</option>
                {sizes.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </FormControl>
            </Col>
          )}
          {isShoesType && (
           <Col>
            {/* Slider for shoe numbers */}
            <div style={{ padding: '10px 0' }}>
              <span>Shoe Number Range: {shoeNumberRange[0]} - {shoeNumberRange[1]}</span>
              <Slider
                range
                min={15}
                max={55}
                value={shoeNumberRange}
                onChange={setShoeNumberRange}
              />
            </div>
          </Col>
           )}
          <Col>
            <FormControl
              as="select"
              value={conditionFilter}
              onChange={(event) => setConditionFilter(event.target.value)}
            >
              <option value="">All Conditions</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </FormControl>
          </Col>
          <Col>
            <FormControl
              as="select"
              value={sortByPrice}
              onChange={(event) => setSortByPrice(event.target.value)}
            >
              <option value="">Sort By Price</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </FormControl>
          </Col>
          <Col>
            <FormControl
              as="select"
              value={sortByUserRating}
              onChange={(event) => setSortByUserRating(event.target.value)}
            >
              <option value="">Sort By User Rating</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </FormControl>
          </Col>
          <Col>
            <Button onClick={() => GetProducts(dispatch, selectedType, selectedSex, selectedSubcategory, searchTerm, selectedColor, sizeFilter, conditionFilter, sortByPrice, sortByUserRating, shoeNumberRange)}>Apply Filters</Button>
          </Col>
          <Col>
          <Button onClick={handleRemoveFilters}>Remove Filters</Button>
        </Col>
        </Row>
      </Form>

      {/* List of products */}
      {products.map(p => (
        <div key={p.id} style={{ marginBottom: '2rem' }}>
          <ListRow product={p} />
        </div>
      ))}
    </div>
  );
};

const ListRow = ({ product }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authenticationSlice.email);
  const profileLink = email === product.email ? `/myProfile` : `/profile/${product.username}`;
  const selectedType = useSelector(state => state.productsSlice.selectedType);
  const isClothesType = selectedType === 'Clothes';
  const isShoesType = selectedType === 'Shoes';

  return (
    <div>
      <Row>
        <Col>{product.productName}</Col>
        <Col>{product.productType}</Col>
        {isClothesType && <Col>{product.productSubcategory}</Col>}
        <Col>{product.productPrice} MKD</Col>
        {isClothesType && <Col>{product.productSize}</Col>}
        {isShoesType && <Col>{product.productSizeNumber}</Col>}
        <Col>{product.productColor}</Col>
        <Col>{product.productCondition}</Col>
        <Col>{product.productSex}</Col>
        <Col>{product.userRating}</Col>
        <Col><Button onClick={() => AddToCart(dispatch, product, email)}>Add to Cart</Button></Col>
        <Col><Button onClick={() => AddToFavourites(dispatch, product, email)}>Add to Favourites</Button></Col>
        <NavLink to={profileLink}>{product.username}</NavLink>
      </Row>
    </div>
  );
};
