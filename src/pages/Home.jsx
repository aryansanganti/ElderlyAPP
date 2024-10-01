import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../components/Navbar';
import './Home.css'; 

const Home = () => {
  return (
    <div style={styles.pageContainer}>
      <Navbar />
      
      {/* Care that Connects Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Care that Connects</h1>
        <p>Empowering seniors with compassionate care and cutting-edge technology.</p>
        <div style={styles.buttonGroup}>
          {/* Link Get Started to /login */}
          <Link to="/login" className="button primary">Get Started</Link>
          <Link to="faqs" className="button secondary">Learn More</Link> {/* Link to FAQs section */}
        </div>
      </header>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.subHead}>Why Choose CareMate?</h2>
        <div style={styles.cardContainer}>
          <div className="card">
            <span role="img" aria-label="heart" style={styles.emoji}>❤️</span>
            <h3 style={styles.h3Card}>Compassionate Care</h3>
            <p style={styles.para}>Our caregivers are trained to provide empathetic and personalized care.</p>
          </div>

          <div className="card">
            <span role="img" aria-label="network" style={styles.emoji}>👥</span>
            <h3 style={styles.h3Card}>Trusted Network</h3>
            <p style={styles.para}>Access a vetted network of professional caregivers in your area.</p>
          </div>

          {/* Link Smart Reminders to /reminder */}
          <Link to="/reminder" className="card">
            <span role="img" aria-label="reminder" style={styles.emoji}>🔔</span>
            <h3 style={styles.h3Card}>Smart Reminders</h3>
            <p style={styles.para}>Never miss important medications or appointments with our intelligent reminder system.</p>
          </Link>

          {/* Link Emergency Alert to /alerts */}
          <Link to="/alerts" className="card">
            <span role="img" aria-label="emergency-alert" style={styles.emoji}>🚨</span>
            <h3 style={styles.h3Card}>Emergency Alert</h3>
            <p style={styles.para}>Get instant emergency alerts and ensure prompt medical assistance when needed.</p>
          </Link>

          {/* Link Health Data to /health */}
          <Link to="/health" className="card">
            <span role="img" aria-label="health-data" style={styles.emoji}>📊</span>
            <h3 style={styles.h3Card}>Health Data</h3>
            <p style={styles.para}>Track your health metrics with real-time data and stay informed about your well-being.</p>
          </Link>

          {/* Link Video Call to /calls */}
          <Link to="/calls" className="card">
            <span role="img" aria-label="video-call" style={styles.emoji}>📞</span>
            <h3 style={styles.h3Card}>Video Call</h3>
            <p style={styles.para}>Connect with your doctor via secure video calls for convenient medical consultations.</p>
          </Link>
        </div>
      </section>
      <section style={styles.featuresSection}>
  <h2 style={styles.subHead}>What Our Clients Say</h2>
  <div style={styles.cardContainer}>
    
    <div className="card">
      <span role="img" aria-label="client-review" style={styles.emoji}>👍</span>
      <h3 style={styles.h3Card}>Life-Saving Care</h3>
      <p style={styles.para}>
        "CareMate has been a lifesaver for my family. The caregivers are always on time and provide the best care."
      </p>
      <h4 style={styles.clientName}>- John Doe</h4>
    </div>
    
    <div className="card">
      <span role="img" aria-label="client-review" style={styles.emoji}>🌟</span>
      <h3 style={styles.h3Card}>Smart Reminders Help</h3>
      <p style={styles.para}>
        "I love the smart reminders feature. It ensures my mom never misses her medications."
      </p>
      <h4 style={styles.clientName}>- Sarah Lee</h4>
    </div>

    <div className="card">
      <span role="img" aria-label="client-review" style={styles.emoji}>👨‍⚕️</span>
      <h3 style={styles.h3Card}>Easy Doctor Access</h3>
      <p style={styles.para}>
        "The video call option with doctors has made it so much easier for my father to get consultations from home."
      </p>
      <h4 style={styles.clientName}>- Alice Brown</h4>
    </div>

    <div className="card">
      <span role="img" aria-label="client-review" style={styles.emoji}>⚠️</span>
      <h3 style={styles.h3Card}>Emergency Assistance</h3>
      <p style={styles.para}>
        "CareMate's emergency alert feature saved my grandmother's life when she needed immediate help."
      </p>
      <h4 style={styles.clientName}>- Michael Smith</h4>
    </div>
    
  </div>
</section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} CareMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 'bold',
    fontStretch: 'expanded', 
  },
  subHead: {
    fontSize: '2.9rem',
    fontWeight: 'bold',
    fontStretch: 'expanded', 
    marginBottom: '2.8rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.7rem',
  },
  featuresSection: {
    textAlign: 'center',
    padding: '4rem 2rem',
    flex: 1, // Ensures the section grows to fill the available space
  },
  fqsSection: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#F9F9F9',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
    flexWrap: 'wrap', 
    alignItems: 'center',
  },
  h3Card: {
    fontSize: '1.8rem',
    fontWeight: '560',
  },
  para: {
    fontSize: '1.1rem',
  },
  emoji: {
    fontSize: '3rem',
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '1.5rem',
  },
  learnMoreLink: {
    display: 'inline-block',
    marginTop: '2rem',
    padding: '1rem 2rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  // Card hover effect styles
  fqsCard: {
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: 'white',
  },
  // Add hover effect to FQS cards
  fqsCardHover: {
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
  }
};

export default Home;
