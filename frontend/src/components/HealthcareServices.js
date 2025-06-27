import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HealthcareServices.css';

const HealthcareServices = () => {
  return (
    <div className="healthcare-services">
      <h2>Healthcare Services</h2>
      <div className="services-grid">
        <Link to="/doctor-appointments" className="service-card">
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
  );
};

export default HealthcareServices; 