import React, {useEffect} from 'react';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { userAuthenticated } from './app/authenticationSlice';
import Navbar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart';
import { ToastContainer } from 'react-toastify';
import ProductAdd from './components/ProductAdd';

const App = () => {
  const isLoggedIn = useSelector(state =>  state.authenticationSlice.isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null) {
      console.log("tuka??????")
      dispatch(userAuthenticated({ token: token }))
    }
  }, []);


  return (
    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <SignInPage />} />
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
        <Route path="*" element={<h2>Page not found!</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
