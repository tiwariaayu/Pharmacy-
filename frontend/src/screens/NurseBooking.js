import React, { useState, useEffect } from 'react';
import '../styles/NurseBooking.css';

const NurseBooking = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingReason, setBookingReason] = useState('');
    const [selectedNurse, setSelectedNurse] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    // New state variables for patient details
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [patientAddress, setPatientAddress] = useState('');

    // Scroll to top when confirmation is shown
    useEffect(() => {
        if (showConfirmation) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [showConfirmation]);

    const specialties = [
        'General Nursing',
        'Pediatric Nursing',
        'Geriatric Nursing',
        'Critical Care',
        'Home Healthcare',
        'Emergency Care'
    ];

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM'
    ];

    // Sample nurse data (replace with API call)
    const nurses = [
        {
            id: 1,
            name: 'Sanvi',
            specialty: 'General Nursing',
            experience: '8 years',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 987654312',
            availability: ['09:00 AM', '10:00 AM', '02:00 PM']
        },
        {
            id: 2,
            name: 'Anirav',
            specialty: 'Pediatric Nursing',
            experience: '3 years',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9870345713',
            availability: ['11:00 AM', '03:00 PM', '04:00 PM']
        },
        {
            id: 3,
            name: 'Komal',
            specialty: 'Geriatric Nursing',
            experience: '2 years',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9874209835',
            availability: ['09:00 AM', '12:00 PM', '05:00 PM']
        }
    ];

    const filteredNurses = selectedSpecialty
        ? nurses.filter(nurse => nurse.specialty === selectedSpecialty)
        : nurses;

    const handleNurseSelect = (nurse) => {
        setSelectedNurse(nurse);
        setError('');
        setSuccess('');
        setShowConfirmation(false);
        // Reset form when selecting a new nurse
        setSelectedDate('');
        setSelectedTime('');
        setBookingReason('');
        setPatientName('');
        setPatientPhone('');
        setPatientAddress('');
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedNurse || !selectedDate || !selectedTime || !bookingReason || 
            !patientName || !patientPhone || !patientAddress) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // TODO: Implement actual booking logic
            console.log('Booking Details:', {
                nurse: selectedNurse,
                date: selectedDate,
                time: selectedTime,
                reason: bookingReason,
                patient: {
                    name: patientName,
                    phone: patientPhone,
                    address: patientAddress
                }
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccess('Booking successful! We will contact you shortly.');
            setShowConfirmation(true);
            
            // Reset form after successful booking
            setSelectedNurse(null);
            setSelectedDate('');
            setSelectedTime('');
            setBookingReason('');
            setPatientName('');
            setPatientPhone('');
            setPatientAddress('');
        } catch (err) {
            setError('Failed to book appointment. Please try again.');
            console.error('Booking error:', err);
        }
    };

    const handleSpecialtyChange = (e) => {
        setSelectedSpecialty(e.target.value);
        setSelectedNurse(null);
        setError('');
        setSuccess('');
        setShowConfirmation(false);
    };

    return (
        <div className="nurse-booking">
            {showConfirmation && (
                <div className="booking-confirmation-overlay">
                    <div className="booking-confirmation">
                        <div className="confirmation-icon">✓</div>
                        <h3>Nurse Booked Successfully!</h3>
                        <p>The nurse will contact you shortly to confirm the appointment.</p>
                        <button 
                            className="confirmation-close-button"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <h2>Book a Nurse</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="filter-section">
                <h3>Filter by Specialty</h3>
                <div className="filter-controls">
                    <select
                        value={selectedSpecialty}
                        onChange={handleSpecialtyChange}
                        className="form-control"
                    >
                        <option value="">All Specialties</option>
                        {specialties.map((specialty, index) => (
                            <option key={index} value={specialty}>
                                {specialty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="booking-container">
                <div className="nurse-list">
                    {filteredNurses.length === 0 ? (
                        <div className="no-nurses-found">
                            <p>No nurses found for the selected specialty.</p>
                        </div>
                    ) : (
                        filteredNurses.map((nurse) => (
                            <div
                                key={nurse.id}
                                className={`nurse-card ${selectedNurse?.id === nurse.id ? 'selected' : ''}`}
                                onClick={() => handleNurseSelect(nurse)}
                            >
                                <div className="nurse-info">
                                    <img
                                        src={nurse.image}
                                        alt={nurse.name}
                                        className="nurse-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/150?text=Nurse';
                                        }}
                                    />
                                    <div className="nurse-details">
                                        <h3>{nurse.name}</h3>
                                        <p className="specialty">{nurse.specialty}</p>
                                        <p>Experience: {nurse.experience}</p>
                                        <div className="nurse-rating">
                                            {'★'.repeat(Math.floor(nurse.rating))}
                                            {'☆'.repeat(5 - Math.floor(nurse.rating))}
                                            <span>({nurse.rating})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="booking-form">
                    <h3>Book Appointment</h3>
                    {selectedNurse ? (
                        <form onSubmit={handleBooking}>
                            <div className="form-group">
                                <label>Selected Nurse</label>
                                <div className="selected-nurse-info">
                                    <p>{selectedNurse.name}</p>
                                    <p>{selectedNurse.specialty}</p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    value={patientPhone}
                                    onChange={(e) => setPatientPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    className="form-control"
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                    placeholder="Enter your complete address"
                                    required
                                    minLength={10}
                                    maxLength={200}
                                />
                            </div>

                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Time</label>
                                <select
                                    className="form-control"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    required
                                >
                                    <option value="">Select a time</option>
                                    {timeSlots.map((time, index) => (
                                        <option
                                            key={index}
                                            value={time}
                                            disabled={!selectedNurse.availability.includes(time)}
                                        >
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Reason for Visit</label>
                                <textarea
                                    className="form-control"
                                    value={bookingReason}
                                    onChange={(e) => setBookingReason(e.target.value)}
                                    placeholder="Please describe your reason for booking..."
                                    required
                                    minLength={10}
                                    maxLength={500}
                                />
                            </div>

                            <button type="submit" className="booking-button">
                                Book Appointment
                            </button>
                        </form>
                    ) : (
                        <div className="no-nurse-selected">
                            <p>Please select a nurse to book an appointment</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NurseBooking; 