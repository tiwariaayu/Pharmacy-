import "../styles/Product.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const Product = ({ 
  imgsrc, 
  title, 
  indication, 
  dosage, 
  sideEffects,
  price,
  productId 
}) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(productId, 1));
  };

  return (
    <div className="product">
      <img 
        src={imgsrc} 
        alt={title} 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/placeholder-medicine.png';
        }}
      />

      <div className="product__info">
        <p className="info__name mt-4">{title}</p>

        <p className="info__description">
          <span className="info__label">Indication: </span>
          {indication}
        </p>
        <p className="info__description">
          <span className="info__label">Dosage: </span>
          {dosage}
        </p>
        <p className="info__description">
          <span className="info__label">Side Effects: </span>
          {sideEffects}
        </p>

        <p className="info__price">₹{price}</p>

        <div className="product__buttons">
          <Link to={`/product/${productId}`} className="info__button view">
            View Details
          </Link>
          <button 
            onClick={addToCartHandler}
            className="info__button add"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
