import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../styles/CategoryProducts.css';

const CategoryProducts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList || {});
  const { products = [], loading, error } = productList;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [products, category]);

  const getCategoryTitle = () => {
    switch (category.toLowerCase()) {
      case 'dermatology':
        return 'Dermatology Products';
      case 'diabetics':
        return 'Diabetes Care Products';
      case 'dental':
        return 'Dental Care Products';
      case 'womens-care':
        return "Women's Healthcare Products";
      default:
        return 'Products';
    }
  };

  const getCategoryDescription = () => {
    switch (category.toLowerCase()) {
      case 'dermatology':
        return 'Browse our range of dermatological products for skin care and treatment.';
      case 'diabetics':
        return 'Find diabetes management products and medications to help you stay healthy.';
      case 'dental':
        return 'Explore our dental care products for maintaining oral health.';
      case 'womens-care':
        return 'Discover specialized healthcare products for women.';
      default:
        return 'Browse our products';
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product);
  };

  return (
    <div className="category-products">
      <div className="category-header">
        <h1>{getCategoryTitle()}</h1>
        <p>{getCategoryDescription()}</p>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => dispatch(listProducts())}>Try Again</button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card" onClick={() => handleProductClick(product)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <p className="description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="product-details-overlay">
          <div className="product-details">
            <button className="close-button" onClick={handleCloseDetails}>×</button>
            <div className="product-details-content">
              <div className="product-details-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="product-details-info">
                <h2>{selectedProduct.name}</h2>
                <p className="price">₹{selectedProduct.price}</p>
                <div className="symptoms">
                  <h3>Symptoms:</h3>
                  <ul>
                    {selectedProduct.symptoms?.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>
                <div className="description">
                  <h3>Description:</h3>
                  <p>{selectedProduct.description}</p>
                </div>
                <div className="usage">
                  <h3>Usage:</h3>
                  <p>{selectedProduct.usage}</p>
                </div>
                <button 
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts; 