import React, {useEffect} from 'react';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { userAuthenticated } from './app/authenticationSlice';
import Navbar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart';
import { ToastContainer } from 'react-toastify';
import ProductAdd from './components/ProductAdd';
import ProductList from './components/ProductList';
import { GetProductTypes ,GetProductSizes, GetProductSubcategories} from './services/products';
import MyProductsPage from './components/MyProductsPage';

const App = () => {
  const isLoggedIn = useSelector(state =>  state.authenticationSlice.isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null) {
      console.log("tuka??????")
      dispatch(userAuthenticated({ token: token }))
    }

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
        console.error('Error fetching product types:', error);
      }
    };
    const fetchProductSubcategores = async () => {
      try {
        GetProductSubcategories(dispatch);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };
    fetchProductTypes();
    fetchProductSizes();
    fetchProductSubcategores();
  }, []);


  return (
    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={isLoggedIn ? <ProductList /> : <SignInPage />} />
        <Route
          path="/signup"
          element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" />} 
        />
        <Route
          path="/signin"
          element={!isLoggedIn ? <SignInPage /> : <Navigate to="/" />} 
        />
         <Route path="/cart" element={isLoggedIn ? <ShoppingCart /> : <SignInPage />} />
         <Route path="/add" element={isLoggedIn ? <ProductAdd /> : <SignInPage />}/>
         <Route path="/myProducts" element={isLoggedIn ? <MyProductsPage /> : <SignInPage />}/>
        <Route path="*" element={<h2>Page not found!</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
