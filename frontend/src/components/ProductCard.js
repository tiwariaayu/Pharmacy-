import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Card = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.small};
  transition: ${theme.transitions.default};
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${theme.transitions.default};
  }
  
  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.h3.fontSize};
  font-weight: ${theme.typography.h3.fontWeight};
`;

const CardPrice = styled.div`
  color: ${theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 500;
  margin: ${theme.spacing.sm} 0;
`;

const CardDescription = styled.p`
  color: ${theme.colors.text.secondary};
  margin: ${theme.spacing.sm} 0;
  font-size: ${theme.typography.body1.fontSize};
  line-height: ${theme.typography.body1.lineHeight};
`;

const AddToCartButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  width: 100%;
  margin-top: ${theme.spacing.sm};
  
  &:hover {
    background: ${theme.colors.primary}dd;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <CardImage>
          <img src={product.image} alt={product.name} />
        </CardImage>
      </Link>
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardPrice>${product.price}</CardPrice>
        <CardDescription>{product.description.substring(0, 100)}...</CardDescription>
        <AddToCartButton>Add to Cart</AddToCartButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 