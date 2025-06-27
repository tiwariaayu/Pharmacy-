import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import '../styles/Header.css';
import Logo from './Logo';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userLogin);
    const { items } = useSelector(state => state.cart);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo-link">
                    <Logo />
                </Link>

                <nav className="nav-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                    <Link to="/doctors" className="nav-link">Doctors</Link>
                    <Link to="/nurses" className="nav-link">Nurses</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </nav>

                <div className="header-right">
                    <Link to="/cart" className="cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                        {items.length > 0 && <span className="cart-count">{items.length}</span>}
                    </Link>
                    
                    {user ? (
                        <div className="user-menu">
                            <span className="user-name">{user.name}</span>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="login-btn">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header; 