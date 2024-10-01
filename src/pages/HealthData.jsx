import React, { useEffect, useState } from 'react';
import './HealthData.css'; // Import custom CSS for styling
import Navbar from '../components/Navbar';
import { useFirebase } from '../context/Firebase'; // Import useFirebase to access Firestore
import { collection, getDocs } from 'firebase/firestore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from 'recharts';

const HealthData = () => {
  const { db } = useFirebase();
  const [healthMetrics, setHealthMetrics] = useState([]);

  const fetchHealthData = async () => {
    try {
      const stepsSnapshot = await getDocs(collection(db, 'steps'));
      const stepsData = stepsSnapshot.docs.map(doc => doc.data());
      
      // Assuming you want to calculate total steps
      const totalSteps = stepsData.reduce((acc, curr) => acc + curr.steps, 0); // Adjust based on your data structure

      // Update health metrics state with the fetched data
      const updatedMetrics = [
        { title: 'Steps', value: totalSteps.toLocaleString(), goal: '61%', chart: [7500, 9000, 7500, 5000, 6500, 7000, totalSteps], unit: '', color: 'blue' },
        { title: 'Heart Rate', value: '61 bpm', goal: '', chart: [60, 65, 63, 62, 64, 61], unit: 'bpm', color: 'red' },
        { title: 'Stress', value: '59 %', goal: '59%', chart: [60, 55, 60, 58, 63, 60], unit: '%', color: 'orange' },
        { title: 'Calories', value: '1893 kcal', goal: '95%', chart: [1700, 1800, 1600, 1900, 2000, 1700], unit: 'kcal', color: 'yellow' },
        { title: 'Water', value: '2.0 L', goal: '79%', chart: [1800, 2000, 1600, 1500, 2000, 1700], unit: 'L', color: 'lightblue' },
        { title: 'Sleep', value: '7 hours', goal: '88%', chart: [6, 7, 8, 5, 7, 6], unit: 'hours', color: 'purple' },
        { title: 'Oxygen', value: '97 %', goal: '', chart: [100, 98, 97, 99, 97, 98], unit: '%', color: 'green' },
        { title: 'Temperature', value: '36.8 °C', goal: '', chart: [36.8, 36.7, 36.9, 36.8, 36.8], unit: '°C', color: 'red' },
        { title: 'Weight', value: '67.9 kg', goal: '', chart: [68, 67.9, 68, 67.8, 67.9], unit: 'kg', color: 'purple' },
      ];
      
      setHealthMetrics(updatedMetrics);
    } catch (error) {
      console.error("Error fetching health data: ", error);
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, [db]);

  return (
    <>
      <Navbar />
      <div className="health-dashboard">
        <div className="dashboard-header-container"> {/* Full row container */}
          <header className="dashboard-header">
            <h2>Health Dashboard</h2>
            <div className="date-range">
              <button>Previous Week</button>
              <span>2024-09-30</span>
              <button>Next Week</button>
            </div>
          </header>
        </div>

        <div className="health-metrics-container"> {/* New container for the box effect */}
          <div className="health-metrics">
            {healthMetrics.map((item, index) => (
              <div key={index} className="health-card">
                <h3>{item.title}</h3>
                <div className="value">{item.value}</div>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: item.goal, backgroundColor: item.color }}
                  ></div>
                  <span>{item.goal}</span>
                </div>

                {/* Render different charts based on the title */}
                {item.title === 'Steps' || item.title === 'Calories' ? (
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={item.chart.map((val, idx) => ({ name: `Day ${idx + 1}`, value: val }))}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke={item.color} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : item.title === 'Stress' ? (
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={[{ name: 'Stress', value: parseFloat(item.value), fill: item.color }, { name: 'Relaxation', value: 100 - parseFloat(item.value), fill: '#ddd' }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill={item.color}
                        paddingAngle={5}
                        dataKey="value"
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={item.chart.map((val, idx) => ({ name: `Day ${idx + 1}`, value: val }))}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill={item.color} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthData;
