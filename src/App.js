import React, { useEffect } from 'react';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userAuthenticated } from './app/authenticationSlice';
import Navbar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart';
import { ToastContainer } from 'react-toastify';
import ProductAdd from './components/ProductAdd';
import ProductList from './components/ProductList';
import MyProductsPage from './components/MyProductsPage';
import MyProfile from './components/MyProfile';
import Profile from './components/Profile';
import Favourites from './components/Favourites';
import MyOrders from './components/MyOrders';

const App = () => {
  const isLoggedIn = useSelector((state) => state.authenticationSlice.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      dispatch(userAuthenticated({ token: token, email: email }));
    }
  }, [dispatch]);
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
         <Route path="/faves" element={isLoggedIn ? <Favourites /> : <SignInPage />}/>
         <Route path="/add" element={isLoggedIn ? <ProductAdd /> : <SignInPage />}/>
         <Route path="/myProducts" element={isLoggedIn ? <MyProductsPage /> : <SignInPage />}/>
         <Route path="/myProfile" element={isLoggedIn ? <MyProfile /> : <SignInPage />}/>
         <Route path="/profile/:username" element={<Profile />} />
         <Route path="/narachki" element={<MyOrders />} />
        <Route path="*" element={<h2>Page not found!</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
