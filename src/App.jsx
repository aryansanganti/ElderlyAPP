import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Caregiver from './pages/CaregiverPage';
import Dashboard from './pages/DashboardPage'; 
import Navbar from './components/Navbar'; 
import Marketplace from './pages/Marketplace';
import LoginPage from './pages/login';
import { FirebaseProvider } from './context/Firebase';
import Reminders from './components/Reminders';
import Appointments from './components/Appointment';
import EmergencyAlert from './components/EmergencyAlert';
import HealthData from './pages/HealthData';
import Faqs from './pages/Faqs';
// import { FirebaseProvider } from './context/Firebase';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caregiver" element={<Caregiver />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/marketplace" element={<Marketplace/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/reminder" element={<Reminders/>} />
          <Route path="/calls" element={<Appointments />} />
          <Route path="/alerts" element={<EmergencyAlert />} />
          <Route path="/health" element={<HealthData/>} />
          <Route path="/faqs" element={<Faqs/>} />
          
        </Routes>
      </Router>
      </FirebaseProvider>
   
  );
}

export default App;