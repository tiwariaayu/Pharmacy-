import React, { useState, useEffect } from 'react';
import '../styles/DoctorAppointments.css';

const DoctorAppointments = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingReason, setBookingReason] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
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
        'General Medicine',
        'Cardiology',
        'Pediatrics',
        'Dermatology',
        'Orthopedics',
        'Neurology',
        'Gynecology',
        'Ophthalmology'
    ];

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM'
    ];

    // Sample doctor data
    const doctors = [
        {
            id: 1,
            name: 'Dr. Rajesh Kumar',
            specialty: 'General Medicine',
            experience: '15 years',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543210',
            availability: ['09:00 AM', '10:00 AM', '02:00 PM'],
            education: 'MBBS, MD (General Medicine)',
            hospital: 'Apollo Hospital'
        },
        {
            id: 2,
            name: 'Dr. Priya Sharma',
            specialty: 'Cardiology',
            experience: '12 years',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543211',
            availability: ['11:00 AM', '03:00 PM', '04:00 PM'],
            education: 'MBBS, MD (Cardiology)',
            hospital: 'Fortis Hospital'
        },
        {
            id: 3,
            name: 'Dr. Amit Patel',
            specialty: 'Pediatrics',
            experience: '10 years',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543212',
            availability: ['09:00 AM', '12:00 PM', '05:00 PM'],
            education: 'MBBS, MD (Pediatrics)',
            hospital: 'Max Hospital'
        },
        {
            id: 4,
            name: 'Dr. Neha Gupta',
            specialty: 'Dermatology',
            experience: '8 years',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543213',
            availability: ['10:00 AM', '02:00 PM', '04:00 PM'],
            education: 'MBBS, MD (Dermatology)',
            hospital: 'Medanta Hospital'
        },
        {
            id: 5,
            name: 'Dr. Vikram Singh',
            specialty: 'Orthopedics',
            experience: '14 years',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543214',
            availability: ['09:00 AM', '11:00 AM', '03:00 PM'],
            education: 'MBBS, MS (Orthopedics)',
            hospital: 'AIIMS Delhi'
        },
        {
            id: 6,
            name: 'Dr. Ananya Reddy',
            specialty: 'Neurology',
            experience: '11 years',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543215',
            availability: ['10:00 AM', '01:00 PM', '04:00 PM'],
            education: 'MBBS, DM (Neurology)',
            hospital: 'NIMHANS Bangalore'
        },
        {
            id: 7,
            name: 'Dr. Rahul Verma',
            specialty: 'Gynecology',
            experience: '13 years',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543216',
            availability: ['09:00 AM', '02:00 PM', '05:00 PM'],
            education: 'MBBS, MD (Gynecology)',
            hospital: 'KIMS Hospital'
        },
        {
            id: 8,
            name: 'Dr. Sneha Kapoor',
            specialty: 'Ophthalmology',
            experience: '9 years',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            phone: '+91 9876543217',
            availability: ['11:00 AM', '03:00 PM', '04:00 PM'],
            education: 'MBBS, MS (Ophthalmology)',
            hospital: 'Sankara Eye Hospital'
        }
    ];

    const filteredDoctors = selectedSpecialty
        ? doctors.filter(doctor => doctor.specialty === selectedSpecialty)
        : doctors;

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setSelectedDate('');
        setSelectedTime('');
        setBookingReason('');
        setPatientName('');
        setPatientPhone('');
        setPatientAddress('');
        setError('');
        setSuccess('');
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedDoctor || !selectedDate || !selectedTime || !bookingReason || 
            !patientName || !patientPhone || !patientAddress) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // TODO: Implement actual booking logic
            console.log('Booking Details:', {
                doctor: selectedDoctor,
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

            setSuccess('Appointment booked successfully! We will contact you shortly.');
            setShowConfirmation(true);
            
            // Reset form after successful booking
            setSelectedDoctor(null);
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

    return (
        <div className="doctor-appointments">
            {showConfirmation && (
                <div className="booking-confirmation-overlay">
                    <div className="booking-confirmation">
                        <div className="confirmation-icon">✓</div>
                        <h3>Appointment Booked Successfully!</h3>
                        <p>The doctor's office will contact you shortly to confirm the appointment.</p>
                        <button 
                            className="confirmation-close-button"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <h2>Book a Doctor Appointment</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="filter-section">
                <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="specialty-select"
                >
                    <option value="">Select Specialty</option>
                    {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                            {specialty}
                        </option>
                    ))}
                </select>
            </div>

            <div className="appointment-container">
                <div className="doctor-list">
                    <h3>Available Doctors</h3>
                    {filteredDoctors.length === 0 ? (
                        <p className="no-doctors">No doctors found for the selected specialty.</p>
                    ) : (
                        <div className="doctors-grid">
                            {filteredDoctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                                    onClick={() => handleDoctorSelect(doctor)}
                                >
                                    <div className="doctor-image">
                                        <img src={doctor.image} alt={doctor.name} />
                                    </div>
                                    <div className="doctor-info">
                                        <h4>{doctor.name}</h4>
                                        <p className="specialty">{doctor.specialty}</p>
                                        <p className="experience">Experience: {doctor.experience}</p>
                                        <p className="education">{doctor.education}</p>
                                        <p className="hospital">{doctor.hospital}</p>
                                        <div className="rating">
                                            <span>★</span> {doctor.rating}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedDoctor && (
                    <div className="booking-form">
                        <h3>Book Appointment with {selectedDoctor.name}</h3>
                        <form onSubmit={handleBooking}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
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
                                    value={patientPhone}
                                    onChange={(e) => setPatientPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    value={patientAddress}
                                    onChange={(e) => setPatientAddress(e.target.value)}
                                    placeholder="Enter your address"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Preferred Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Preferred Time</label>
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    required
                                >
                                    <option value="">Select Time</option>
                                    {timeSlots.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Reason for Visit</label>
                                <textarea
                                    value={bookingReason}
                                    onChange={(e) => setBookingReason(e.target.value)}
                                    placeholder="Please describe your symptoms or reason for visit"
                                    required
                                />
                            </div>

                            <button type="submit" className="book-button">
                                Book Appointment
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments; 