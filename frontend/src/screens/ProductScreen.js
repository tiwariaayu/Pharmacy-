import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import '../styles/ProductScreen.css';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="no-product">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="productscreen">
      <div className="productscreen__left">
        <div className="left__image">
          <img src={product.imgsrc} alt={product.title} />
        </div>
        <div className="left__info">
          <p className="left__name">{product.title}</p>
          <p>Price: ₹{product.price}</p>
          <p>Indication: {product.indication}</p>
          <p>Dosage: {product.dosage}</p>
          <p>Side Effects: {product.sideEffects}</p>
        </div>
      </div>
      <div className="productscreen__right">
        <div className="right__info">
          <p>
            Price: <span>₹{product.price}</span>
          </p>
          <p>
            Status:{' '}
            <span>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </p>
          <p>
            Qty
            <select value={qty} onChange={(e) => setQty(e.target.value)}>
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </p>
          <p>
            <button
              className={product.countInStock === 0 ? 'disabled' : ''}
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              Add To Cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
