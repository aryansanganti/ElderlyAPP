import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Caregiver = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    'Medication Management',
    'Personal Hygiene Assistance',
    'Companionship',
    'Meal Preparation',
    'Mobility Support',
    'Light Housekeeping'
  ];

  const handleServiceChange = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(item => item !== service)
        : [...prev, service]
    );
  };

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        {/* Caregiver Profile */}
        <div style={styles.profileCard}>
          <h2>Alice Johnson</h2>
          <div style={styles.rating}>
            <span style={styles.ratingText}>⭐ 4.8 (56 reviews)</span>
          </div>
          <p>
            Compassionate and experienced caregiver specializing in elderly care. I'm dedicated to providing personalized care that enhances the quality of life for seniors.
          </p>
          <p>🕒 5 years of experience</p>

          {/* Services Offered */}
          <div style={styles.servicesOffered}>
            <h3>Services Offered</h3>
            {services.map(service => (
              <div key={service} style={styles.serviceItem}>
                <input
                  type="checkbox"
                  onChange={() => handleServiceChange(service)}
                  checked={selectedServices.includes(service)}
                />
                <label>{service}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* Date and Time Picker */}
        <div style={styles.dateTimePicker}>
          <h3>Book Alice Johnson</h3>
          <p>Select a date and time to schedule care</p>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={styles.selectTime}
          >
            <option value="">Select time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
          </select>
          <button style={styles.button}>Book Appointment</button>
        </div>

        {/* Booking Summary */}
        <div style={styles.bookingSummary}>
          <h3>Booking Summary</h3>
          <p>Date: {selectedDate.toLocaleDateString()}</p>
          <p>Time: {selectedTime || 'Not selected'}</p>
          <p>Rate: $25/hour</p>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    justifyContent: 'space-between',
  },
  leftSection: {
    width: '55%',
  },
  rightSection: {
    width: '40%',
  },
  profileCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
  },
  rating: {
    marginBottom: '10px',
  },
  ratingText: {
    fontSize: '18px',
    color: '#f39c12',
  },
  servicesOffered: {
    marginTop: '20px',
  },
  serviceItem: {
    marginBottom: '10px',
  },
  dateTimePicker: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
  },
  selectTime: {
    width: '100%',
    padding: '8px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  bookingSummary: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
  },
};

export default Caregiver;