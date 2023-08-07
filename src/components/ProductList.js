import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts, GetProductConditions, GetProductSizes,AddToCart, AddToFavourites } from '../services/products';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { CompactPicker } from 'react-color';
import { setSelectedFilters } from '../app/productsSlice';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsSlice.products);
  console.log(products)
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
  const navigate = useNavigate();


 
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
  }, [dispatch, selectedType, selectedSex, selectedSubcategory, sortByPrice, sortByUserRating, searchTerm]);

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
    setShoeNumberRange('');
    GetProducts(dispatch, selectedType, selectedSex, selectedSubcategory, searchTerm, selectedColor, sizeFilter, conditionFilter, sortByPrice, sortByUserRating, shoeNumberRange);
  };

  const handleBreadCrumbs = (type, sex, subcategory) => {

    dispatch(setSelectedFilters({ type, sex, subcategory }));
    navigate('/');
  };

  const styles = `

.breadcrumb>li+li:before {
    content: "" !important;
}

.breadcrumb {
  padding: 25px;
  font-size: 14px;
  color: #aaa !important;
  letter-spacing: 2px;
  border-radius: 5px !important;
}

.first-1 {
    background-color: rgba(255, 255, 255, 0.7) !important;
}

a {
    text-decoration: none !important;
}

a:focus,
a:active {
    outline: none !important;
    box-shadow: none !important;
}

img {
    vertical-align: bottom;
    opacity: 0.3;
}

.first span {
    color: black;
}

.breadcrumb-item-content {
  display: flex;
  align-items: center;
}

.active-1  , .active-2{
    font-size: 13px !important;
    padding-bottom: 12px !important;
    padding-top: 12px !important;
    padding-right: 25px !important;
    padding-left: 25px !important;
    border-radius: 200px !important;
    background-color: #C2A4C8  !important;
    color: black;
}



#sidebar {
  width: 100%;
  min-height: 30vh; /* Set the minimum height to cover the entire viewport height */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center; /* Align content at the top */
  align-items: center; /* Center horizontally */
  margin: 10px;
}

/* Additional styling for the content within the sidebar */
#sidebar-content {
  width: 100%;
  max-width: 80%; 
}\

#sidebar-content .row {
  margin-bottom: 15px;
}

#sidebar-content button {
  background-color: black !important;
  color: white !important;
}


`;

  return (
    <div>
       <style>{styles}</style>
      <div class="container d-flex justify-content-center mt-4"> {/* Added mt-4 for top margin */}
  <nav aria-label="breadcrumb " class="first  d-md-flex">
    <ol class="breadcrumb indigo lighten-6 first-1 shadow-lg mb-5">
        <li class="breadcrumb-item">
        <Nav.Link href="#" 
                      className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleBreadCrumbs('', '', '')}
                      >
                       Buy
          </Nav.Link>
        </li>
      {selectedSex && (
        <li class="breadcrumb-item">
          <div class="breadcrumb-item-content">
          <img
            class="mr-md-3 mr-1"
            src="https://img.icons8.com/metro/50/000000/chevron-right.png"
            width="20"
            height="20"
          />
          <Nav.Link href="#" 
                      className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleBreadCrumbs('', selectedSex, '')}
                      >
                       {selectedSex}
          </Nav.Link>
          </div>
        </li>
      )}
      {selectedType && (
        <li class="breadcrumb-item">
          <div class="breadcrumb-item-content">
          <img
            class="mr-md-3 mr-1"
            src="https://img.icons8.com/metro/50/000000/chevron-right.png"
            width="20"
            height="20"
          />
       
          <Nav.Link href="#" 
                        className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() => handleBreadCrumbs(selectedType, selectedSex, '')}
                      >
                       {selectedType}
          </Nav.Link>
          </div>
        </li>

      )}
      {selectedSubcategory && (
        <li class="breadcrumb-item">
                    <div class="breadcrumb-item-content">
            <img
            class="mr-md-3 mr-1"
            src="https://img.icons8.com/metro/50/000000/chevron-right.png"
            width="20"
            height="20"
          />
          <Nav.Link href="#" 
                        className='black-text active-2'
                        style={{ color: '#000000', paddingLeft: '60px' }}
                        onClick={() =>  handleBreadCrumbs(selectedType, selectedSex, selectedSubcategory)}
                      >
                       {selectedSubcategory}
          </Nav.Link>
          </div>
        </li>
      )}
    </ol>
  </nav>
</div>
    <div>
    <div className='container mb-4'>
    <Row>
  {/* Search and Sort Controls */}
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
            <FormControl
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
  </Col>
  <Col>
  <i className="fa fa-search"></i>
  </Col>
</Row>
    </div>
    <div className='container'>
    <Row>
      <Col md={3}>
    <section id="sidebar">
    <div id="sidebar-content">
        <h6 class="p-1 border-bottom">Filter By</h6>
        <Row>
      <Col>
        <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: selectedColor,
                  marginRight: '10px',
                  border: '1px solid black',
                }}
              />
              <Button onClick={() => setShowColorPicker(true)}>Color</Button>
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
            </div>
          </Col>
        </Row>

        {isClothesType && (
          <Row>
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
            </Row>
          )}

        {isShoesType && (
          <Row>
           <Col>
            {/* Slider for shoe numbers */}
            <div style={{ padding: '10px 0' }}>
              <p class="mb-2">Shoe Size Number Range: {shoeNumberRange[0]} - {shoeNumberRange[1]}</p>
              <Slider
                range
                min={15}
                max={55}
                value={shoeNumberRange}
                onChange={setShoeNumberRange}
              />
            </div>
          </Col>
          </Row>
           )}
          <Row>
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
          </Row>
          <Row>
          <Col>
            <Button onClick={() => GetProducts(dispatch, selectedType, selectedSex, selectedSubcategory, searchTerm, selectedColor, sizeFilter, conditionFilter, sortByPrice, sortByUserRating, shoeNumberRange)}>Apply Filters</Button>
          </Col>
          </Row>
          <Row>
        <Col>
          <Button onClick={handleRemoveFilters}>Remove Filters</Button>
        </Col>
          </Row>
    </div>
</section>
</Col>

<Col md={9}>
{/* Product Listing */}
      <Row>
        {products.map(p => (
          <Col key={p.id} sm={4} style={{ marginBottom: '2rem' }}>
            <ListRow product={p} />
          </Col>
        ))}
      </Row>
</Col>
</Row>
    </div>
    </div>
    </div>
  );
};


const ListRow = ({ product }) => {

  const email = useSelector((state) => state.authenticationSlice.email);
  const dispatch = useDispatch();

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));

    return (
      <div className="stars">
        <span className="filled-stars">{filledStars}</span>
        <span className="empty-stars">{emptyStars}</span>
      </div>
    );
  };

  const styles = `
  .content .card {
    width: 50rem;
    height: 15rem;
  }

    .card {
    flex-direction: row;
  }

  .card-img {
    border-top-right-radius: 0;
    border-bottom-left-radius: calc(0.25rem - 1px);
    opacity: 1;
}

 .content .card .card-title {
    color: black;
    
  }

  .stars {
    font-size: 32px; 
    display: flex;
    align-items: center;
    justify-content: center;
  }

`;

  return (
    <div className="col">
    <style>{styles}</style>
    <div className="card mb-3" style={{ maxWidth: '540px', backgroundColor: '#C2A4C8' }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <div className="d-flex align-items-center" style={{ padding:'20px' }}>
            <img
              src={product.productImage}
              className="card-img img-fluid"
              alt="Image"
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title text-center">{product.productName}</h4>
            <h6 className="card-title text-right me-5">{product.productPrice} MKD</h6>
            <h5 className="card-text text-center" style={{ color: '#000000' }}>
              Seller Rating : {renderStars(product.userRating)}
            </h5>
            <div className='text-center'>
             <div className="btn btn-dark">
                  View more
            </div>
            <Col><Button onClick={() => AddToCart(dispatch, product, email)}>Add to Cart</Button></Col>
            <Col><Button onClick={() => AddToFavourites(dispatch, product, email)}>Add to Cart</Button></Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};
