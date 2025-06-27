import "../styles/HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <div className="container text-center">
        <h1 className="mt-3">Diabetes</h1>
        <hr className="w-25 mx-auto" />
      </div>
      <div className="homescreen__products">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <h2>Loading products...</h2>
          </div>
        ) : error ? (
          <div className="error">
            <h2>Error: {error}</h2>
            <p>Please try again later</p>
          </div>
        ) : products && products.length > 0 ? (
          products
            .filter(product => product.category === "Diabetes")
            .map((product) => (
              <Product
                key={product._id}
                imgsrc={product.imgsrc}
                title={product.title}
                indication={product.indication}
                dosage={product.dosage}
                sideEffects={product.sideEffects}
                price={product.price}
                productId={product._id}
              />
            ))
        ) : (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
