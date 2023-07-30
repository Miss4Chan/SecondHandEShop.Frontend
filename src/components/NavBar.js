import { Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/authenticationSlice';
import React from 'react';
import SidebarMenu from './SidebarMenu';

const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();

    return <Nav className='navbar' style={{ backgroundColor: '#e4fff2' }}>
        <SidebarMenu />
        <h1 style={{ fontFamily: 'Brush Script MT, cursive' }}>Second Hand EShop</h1>
        {isLoggedIn
            ?
            <div style={{display:'flex', alignItems:'center'}}>
                <NavLink style={{ marginLeft: '1rem' }} variant='link' to='/'>Home</NavLink>
                <Button variant='link' href='/signin' onClick={() => { dispatch(logout()) }}>Log out</Button>
                <NavLink to="/cart" style={{ marginLeft: '1rem' }}>Shopping Cart</NavLink>
                <NavLink to="/faves" style={{ marginLeft: '1rem' }}>Favourites</NavLink>
                <NavLink to="/myProducts" style={{ marginLeft: '1rem' }}>My products</NavLink>
                <NavLink to="/myProfile" style={{ marginLeft: '1rem' }}>My profile</NavLink>
                <NavLink to="/narachki" style={{ marginLeft: '1rem' }}>My orders</NavLink>
            </div>
            : <div style={{ display: 'flex' }}>
                <NavLink to="/signup">Sign up</NavLink>
                <NavLink to="/signin" style={{ marginLeft: '1rem' }}>Sign in</NavLink>
            </div>}
    </Nav >
};

export default Navbar;
