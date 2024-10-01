import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../context/Firebase';
import Navbar from '../components/Navbar';
import CaregiverCard from '../components/Caregiver';

const Marketplace = () => {
  const { db } = useFirebase(); // Access Firestore from Firebase context
  const [caregivers, setCaregivers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCaregivers = async () => {
      const caregiversCollection = collection(db, 'caregivers');
      const caregiversSnapshot = await getDocs(caregiversCollection);
      const caregiversList = caregiversSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCaregivers(caregiversList);
    };

    const fetchReviews = async () => {
      const reviewsCollection = collection(db, 'reviews');
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewsList = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsList);
    };

    fetchCaregivers();
    fetchReviews();
  }, [db]);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Available Care Givers</h2>
        <div style={styles.filters}>
          <input type="text" placeholder="Search caregivers..." style={styles.input} />
          <select style={styles.select}>
            <option>Highest Rated</option>
            <option>Lowest Price</option>
            <option>Most Experienced</option>
          </select>
          <button style={styles.button}>Filters</button>
        </div>
        <div style={styles.sliderContainer}>
          <label>
            Max Distance: <input type="range" min="0" max="50" /> 10 miles
          </label>
          <label>
            Max Hourly Rate: <input type="range" min="0" max="100" /> $30
          </label>
        </div>
        <div style={styles.caregiverGrid}>
          {caregivers.map(caregiver => {
            const caregiverReviews = reviews.filter(review => review.caregiverId === caregiver.id);
            const averageRating = caregiverReviews.length > 0
              ? caregiverReviews.reduce((acc, review) => acc + review.rating, 0) / caregiverReviews.length
              : 0;
            const reviewCount = caregiverReviews.length;

            return (
              <CaregiverCard key={caregiver.id} caregiver={{ ...caregiver, averageRating, reviewCount }} />
            );
          })}
        </div>
      </div>
    </>
  );
};

// Styles
const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  select: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  button: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  caregiverGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Only 3 cards horizontally
    gap: '20px',
  },
};

export default Marketplace;