import React from 'react';

const CaregiverCard = ({ caregiver }) => {
  // Ensure caregiver data is defined
  if (!caregiver) {
    return null; // Return nothing if no caregiver data
  }

  const { name, experience, hourlyRate, location, specialties = [] } = caregiver;

  return (
    <div style={styles.card}>
      <h3>{name}</h3>
      <p>Experience: {experience} years</p>
      <p>Hourly Rate: ${hourlyRate}</p>
      <p>Location: {location}</p>
      <h4>Specialties:</h4>
      <ul>
        {specialties.length > 0 ? (
          specialties.map((specialty, index) => (
            <li key={index}>{specialty}</li>
          ))
        ) : (
          <li>No specialties listed</li>
        )}
      </ul>
      <p>Average Rating: {caregiver.averageRating.toFixed(1)} ({caregiver.reviewCount} reviews)</p>
    </div>
  );
};

// Styles for the caregiver card
const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};

export default CaregiverCard;