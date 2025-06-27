import React, { useState, useEffect } from 'react';
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../images/logo.png";
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Nav = styled.nav`
  background: ${theme.colors.surface};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${theme.shadows.small};
  transition: ${theme.transitions.default};
  
  &.scrolled {
    height: 60px;
    background: ${theme.colors.surface}dd;
    backdrop-filter: blur(10px);
  }
`;

const Logo = styled(Link)`
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    margin-right: ${theme.spacing.sm};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.small};
  transition: ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primary};
    background: ${theme.colors.primary}11;
  }
`;

const CartIcon = styled(Link)`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  position: relative;
  padding: ${theme.spacing.sm};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${theme.colors.primary};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  
  @media (max-width: 768px) {
    display: block;
  }
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    <Nav className={scrolled ? 'scrolled' : ''}>
      <Logo to="/">
        <img src={logo} style={{ height: "40px", width: "200px" }} alt="" />
        Pharmacy
      </Logo>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/allProducts">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <CartIcon to="/cart">
          <i className="fas fa-shopping-cart"></i>
          <CartCount>{getCartCount()}</CartCount>
        </CartIcon>
      </NavLinks>
      
      <MenuButton onClick={click}>
        <i className="fas fa-bars"></i>
      </MenuButton>
    </Nav>
  );
};

export default Navbar;
