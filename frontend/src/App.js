import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainScreen from './screens/MainScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import AllProductsScreen from './screens/AllProductsScreen';
import DermotologyScreen from './screens/DermotologyScreen';
import DepressionScreen from './screens/DepressionScreen';
import DentalScreen from './screens/DentalScreen';
import FractureScreen from './screens/FractureScreen';
import WomensCareScreen from './screens/WomensCareScreen';
import AdminScreen from './screens/AdminScreen';
import HealthcareServices from './components/HealthcareServices';
import DoctorAppointments from './screens/DoctorAppointments';
import NurseBooking from './screens/NurseBooking';
import CategoryProducts from './screens/CategoryProducts';
import MedicineChatbot from './components/MedicineChatbot';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/allProducts" element={<AllProductsScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/products/dermatology" element={<DermotologyScreen />} />
            <Route path="/products/depression" element={<DepressionScreen />} />
            <Route path="/products/dental" element={<DentalScreen />} />
            <Route path="/products/fracture" element={<FractureScreen />} />
            <Route path="/products/womensCare" element={<WomensCareScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
            
            {/* Healthcare Services Routes */}
            <Route path="/healthcare" element={<HealthcareServices />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/nurse-booking" element={<NurseBooking />} />
            <Route path="/category/:category" element={<CategoryProducts />} />
          </Routes>
        </main>
        <Footer />
        <MedicineChatbot />
      </div>
    </Router>
  );
};

export default App;
