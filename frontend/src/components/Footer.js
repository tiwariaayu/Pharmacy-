import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.md};
    font-weight: 600;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  display: block;
  margin-bottom: ${theme.spacing.sm};
  transition: ${theme.transitions.fast};
  
  &:hover {
    color: white;
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const ContactInfo = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  i {
    color: ${theme.colors.secondary};
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Medi-Mitra</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Your trusted online pharmacy providing quality healthcare products and services. 
            We deliver health and wellness right to your doorstep.
          </p>
          <SocialLinks>
            <SocialIcon href="#" target="_blank"><i className="fab fa-facebook"></i></SocialIcon>
            <SocialIcon href="#" target="_blank"><i className="fab fa-twitter"></i></SocialIcon>
            <SocialIcon href="#" target="_blank"><i className="fab fa-instagram"></i></SocialIcon>
            <SocialIcon href="#" target="_blank"><i className="fab fa-linkedin"></i></SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLink to="/allProducts">All Products</FooterLink>
          <FooterLink to="/products/dermatology">Dermatology</FooterLink>
          <FooterLink to="/products/dental">Dental Care</FooterLink>
          <FooterLink to="/products/womensCare">Women's Health</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterSection>

        <FooterSection>
          <h3>Healthcare Services</h3>
          <FooterLink to="/products/depression">Mental Health</FooterLink>
          <FooterLink to="/products/fracture">Orthopedic Care</FooterLink>
          <FooterLink to="/products/dermatology">Skin Care</FooterLink>
          <FooterLink to="/products/dental">Dental Products</FooterLink>
          <FooterLink to="/products/womensCare">Women's Care</FooterLink>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <i className="fas fa-phone"></i>
            +91 8252577379
          </ContactInfo>
          <ContactInfo>
            <i className="fas fa-envelope"></i>
            tiwariayushman@gmail.com
          </ContactInfo>
          <ContactInfo>
            <i className="fas fa-map-marker-alt"></i>
            Bhagwanpur, Muzaffarpur, Bihar
          </ContactInfo>
          <ContactInfo>
            <i className="fas fa-clock"></i>
            24/7 Customer Support
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© {new Date().getFullYear()} Medi-Mitra. All rights reserved.</p>
        <p style={{ fontSize: '0.9rem', marginTop: theme.spacing.sm }}>
          Your trusted partner in health and wellness. Licensed Pharmacy 
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
