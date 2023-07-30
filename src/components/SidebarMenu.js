import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { setSelectedFilters } from '../app/productsSlice';
import { useNavigate } from 'react-router-dom';

const SidebarMenu = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isFemaleSubmenuOpen, setFemaleSubmenuOpen] = useState(false);
  const [isMaleSubmenuOpen, setMaleSubmenuOpen] = useState(false);
  const [isFemaleClothesOpen, setFemaleClothesOpen] = useState(false);
  const [isMaleClothesOpen, setMaleClothesOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
    // When toggling the main menu, close the submenus if they are open
    if (isFemaleSubmenuOpen) {
      setFemaleSubmenuOpen(false);
    }
    if (isMaleSubmenuOpen) {
      setMaleSubmenuOpen(false);
    }
  };

  const toggleFemaleSubmenu = () => {
    setFemaleSubmenuOpen(!isFemaleSubmenuOpen);
    // If the Female submenu is open, close the Male submenu
    if (isMaleSubmenuOpen && !isFemaleSubmenuOpen) {
      setMaleSubmenuOpen(false);
    }
  };

  const toggleMaleSubmenu = () => {
    setMaleSubmenuOpen(!isMaleSubmenuOpen);
    // If the Male submenu is open, close the Female submenu
    if (isFemaleSubmenuOpen && !isMaleSubmenuOpen) {
      setFemaleSubmenuOpen(false);
    }
  };

  const toggleFemaleClothes = () => {
    setFemaleClothesOpen(!isFemaleClothesOpen);
  };

  const toggleMaleClothes = () => {
    setMaleClothesOpen(!isMaleClothesOpen);
  };

  const handleFilterChange = (type, sex, subcategory) => {
    setNavOpen(false);
    setFemaleSubmenuOpen(false);
    setMaleSubmenuOpen(false);

    dispatch(setSelectedFilters({ type, sex, subcategory }));
    navigate('/');
  };

  const styles = `
    /* Sidebar Menu */
    .sidebar-menu {
      position: relative;
      width: 240px; /* Set your desired width */
    }
    
    .sidebar-toggle {
      cursor: pointer;
      font-size: 24px;
      padding: 10px;
      background-color: #f8f9fa; /* Set the background color of the toggle */
      border-bottom: 1px solid #dee2e6; /* Set the border color */
    }
    
    .sidebar-toggle.open {
      border-bottom: none;
    }
    
    .sidenav {
      position: absolute;
      top: 50px; /* Adjust this value based on your design */
      left: 0;
      width: 240px; /* Set your desired width */
      background-color: #f8f9fa; /* Set the background color of the sidebar */
      border: 1px solid #dee2e6; /* Set the border color */
      transition: transform 0.3s ease-in-out;
      transform: translateX(-100%);
    }
    
    .sidenav.open {
      transform: translateX(0);
    }
  `;

  return (
    <div className="sidebar-menu">
      <style>{styles}</style>
      <span className={`sidebar-toggle ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
        &#9776; ReWear
      </span>
      <Navbar collapseOnSelect className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        <Nav className="flex-column">
          <Nav.Link href="#" style={{ color: '#000000' }}>
            Home
          </Nav.Link>
          <Nav.Link href="#" style={{ color: '#000000' }}>
            About Us
          </Nav.Link>
          <Nav.Link href="#" style={{ color: '#000000' }}>
            Buy
          </Nav.Link>
          {/* Female Submenu */}
          <Nav.Link
            href="#"
            style={{ color: '#000000', paddingLeft: '20px' }}
            onClick={toggleFemaleSubmenu}
          >
            Female
          </Nav.Link>
          {isFemaleSubmenuOpen && (
            <>
              <Nav.Link
                href="#"
                style={{ color: '#000000', paddingLeft: '40px' }}
                onClick={toggleFemaleClothes}
              >
                Clothes
              </Nav.Link>
              {isFemaleClothesOpen && (
                <>
                  <Nav.Link href="#" 
                  style={{ color: '#000000', paddingLeft: '60px' }}
                  onClick={() => handleFilterChange('Clothes', 'Female', '')}>
                    All
                  </Nav.Link>
                  <Nav.Link href="#" 
                  style={{ color: '#000000', paddingLeft: '60px' }}
                  onClick={() => handleFilterChange('Clothes', 'Female', 'TShirts/Tops')}>
                    TShirts/Tops
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Blouses/Shirts')}
                  >
                    Blouses/Shirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Sweatshirts')}>
                    Sweatshirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Jackets/Coats/Blazers')}>
                    Jackets/Coats/Blazers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Dresses')}>
                    Dresses
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Trousers')}>
                    Trousers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Jeans')}>
                    Jeans
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Female', 'Skirts/Shorts')}>
                    Skirts/Shorts
                  </Nav.Link>
                </>
              )}
              <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }}
              onClick={() => handleFilterChange('Accessories', 'Female', '')}>
                Accessories
              </Nav.Link>
              <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }}
               onClick={() => handleFilterChange('Shoes', 'Female', '')}>
                Shoes
              </Nav.Link>
            </>
          )}
          {/* End of Female Submenu */}
          {/* Male Submenu */}
          <Nav.Link
            href="#"
            style={{ color: '#000000', paddingLeft: '20px' }}
            onClick={toggleMaleSubmenu}
          >
            Male
          </Nav.Link>
          {isMaleSubmenuOpen && (
            <>
              <Nav.Link
                href="#"
                style={{ color: '#000000', paddingLeft: '40px' }}
                onClick={toggleMaleClothes}
              >
                Clothes
              </Nav.Link>
              {isMaleClothesOpen && (
                <>  
                  <Nav.Link href="#" 
                  style={{ color: '#000000', paddingLeft: '60px' }}
                  onClick={() => handleFilterChange('Clothes', 'Male', '')}>
                    All
                  </Nav.Link>
                  <Nav.Link href="#" 
                  style={{ color: '#000000', paddingLeft: '60px' }}
                  onClick={() => handleFilterChange('Clothes', 'Male', 'TShirts')}>
                    TShirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Blouses/Shirts')}
                  >
                    Blouses/Shirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Sweatshirts')}>
                    Sweatshirts
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Jackets/Coats/Blazers')}>
                    Jackets/Coats/Blazers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Trousers')}>
                    Trousers
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Jeans')}>
                    Jeans
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '60px' }}
                   onClick={() => handleFilterChange('Clothes', 'Male', 'Shorts')}>
                    Shorts
                  </Nav.Link>
                </>
              )}
              <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }}
              onClick={() => handleFilterChange('Accessories', 'Male', '')}>
                Accessories
              </Nav.Link>
              <Nav.Link href="#" style={{ color: '#000000', paddingLeft: '40px' }}
               onClick={() => handleFilterChange('Shoes', 'Male', '')}>
                Shoes
              </Nav.Link>
            </>
          )}
          {/* End of Male Submenu */}
          <Nav.Link href="#" style={{ color: '#000000' }}>
            Sell
          </Nav.Link>
          <Nav.Link href="#" style={{ color: '#000000' }}>
            Rent
          </Nav.Link>
          <Nav.Link href="#" style={{ color: '#000000' }}>
            Contact Us
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default SidebarMenu;
