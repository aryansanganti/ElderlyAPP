// src/context/Firebase.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpUXcH5ZXshC_Ihh1KM0G4yPmGh7YkvVE",
  authDomain: "hackathon-elderly-thing.firebaseapp.com",
  projectId: "hackathon-elderly-thing",
  storageBucket: "hackathon-elderly-thing.appspot.com",
  messagingSenderId: "41117400610",
  appId: "1:41117400610:web:3e8a1463654e7723aa947b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app);

// Create Firebase context
const FirebaseContext = createContext();

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google sign-in function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Sign out function
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Check for user state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sample function to add a review (replace with your actual logic)
  const addReview = async (caregiverId, reviewText, rating) => {
    // Implement your review addition logic using Firestore
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, signInWithGoogle, logout, db, addReview }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use Firebase context
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
