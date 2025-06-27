import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import caro1 from "../images/caro1.jpg";
import caro2 from "../images/caro2.jpg";
import caro3 from "../images/caro3.jpg";
import caro4 from "../images/caro4.webp";
import "../styles/MainScreen.css";
import allProductsData from "../Data/allProductsData";
import Card from "../components/Card";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const MainScreen = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();

    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product, 1));
        handleCloseDetails();
    };

    return (
        <div className="mainscreen">
            <div className="hero">
                <h1>Welcome to Your Healthcare Partner</h1>
                <p>Quality healthcare services at your fingertips</p>
            </div>

            <div className="services-section">
                <h2>Our Services</h2>
                <div className="services-grid">
                    <Link to="/healthcare" className="service-card">
                        <div className="service-icon">👨‍⚕️</div>
                        <h3>Doctor Appointments</h3>
                        <p>Book appointments with qualified doctors</p>
                    </Link>
                    <Link to="/nurse-booking" className="service-card">
                        <div className="service-icon">👩‍⚕️</div>
                        <h3>Nurse Booking</h3>
                        <p>Book home visits from experienced nurses</p>
                    </Link>
                    <div className="service-card coming-soon">
                        <div className="service-icon">🚑</div>
                        <h3>Emergency Ambulance</h3>
                        <p>Coming Soon</p>
                    </div>
                    <div className="service-card coming-soon">
                        <div className="service-icon">🏥</div>
                        <h3>Healthcare Utilities</h3>
                        <p>Coming Soon</p>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={caro2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={caro1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={caro3} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={caro4} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="homescreen" style={{marginTop:"50px"}}>
                <div className="container text-center ">
                    <h1 className="mt-3 ">Explore By</h1>
                    <hr className="w-50 mx-auto" />
                </div>

                <div className="homescreen__products">
                    {allProductsData.map((val, index) => {
                        return (
                            <Card
                                key={index}
                                imgsrc={val.imgsrc}
                                title={val.title}
                                info={val.info}
                                link={val.link}
                                id={val.id}
                            />
                        )
                    })}
                </div>
            </div>

            {selectedProduct && (
                <div className="product-details-overlay" onClick={handleCloseDetails}>
                    <div className="product-details" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={handleCloseDetails}>×</button>
                        <div className="product-details-content">
                            <div className="product-image">
                                <img src={selectedProduct.imgsrc} alt={selectedProduct.title} />
                            </div>
                            <div className="product-info">
                                <h2>{selectedProduct.title}</h2>
                                <div className="price">₹{selectedProduct.price}</div>
                                <div className="symptoms">
                                    <h3>Symptoms</h3>
                                    <ul>
                                        {selectedProduct.symptoms?.map((symptom, index) => (
                                            <li key={index}>{symptom}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="description">
                                    <h3>Description</h3>
                                    <p>{selectedProduct.description}</p>
                                </div>
                                <div className="usage">
                                    <h3>Usage</h3>
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

export default MainScreen;
