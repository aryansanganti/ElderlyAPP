import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase"; // Import useFirebase to access Firestore
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const { db } = useFirebase();
  const [healthProgress, setHealthProgress] = useState(100);
  const [upcomingEvents, setUpcomingEvents] = useState([]); // State to hold upcoming events
  const [healthMetrics, setHealthMetrics] = useState({
    steps: 0,
    bloodPressure: '120/80', // example format
    o2Levels: 97,
    heartRate: 61,
  });

  const features = [
    { icon: "🔔", title: "Reminders", count: 3, route: "/reminder" },
    { icon: "📞", title: "Appointment", count: 2, route: "/calls" },
    { icon: "⚠️", title: "Alerts", count: 0, route: "/alerts" },
    { icon: "❤️", title: "Health", count: 1, route: "/health" },
  ];

  // Function to calculate health progress based on metrics
  const calculateHealthProgress = () => {
    const { steps, bloodPressure, o2Levels, heartRate } = healthMetrics;

    // Example weights for each metric
    const stepsWeight = 0.25;
    const bloodPressureWeight = 0.25;
    const o2LevelsWeight = 0.25;
    const heartRateWeight = 0.25;

    // Normalize metrics for calculation
    const normalizedSteps = Math.min(steps / 10000, 1); // Example: max steps = 10,000
    const normalizedBloodPressure = (bloodPressure === '120/80' ? 1 : 0); // Example: normal BP
    const normalizedO2Levels = Math.min(o2Levels / 100, 1); // Example: max O2 = 100%
    const normalizedHeartRate = (heartRate >= 60 && heartRate <= 100 ? 1 : 0); // Normal heart rate range

    // Calculate weighted average
    const overallHealth =
      (normalizedSteps * stepsWeight) +
      (normalizedBloodPressure * bloodPressureWeight) +
      (normalizedO2Levels * o2LevelsWeight) +
      (normalizedHeartRate * heartRateWeight);

    return Math.round(overallHealth * 100); // Return percentage
  };

  // Fetch steps from Firestore
  const fetchSteps = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'steps'));
      const stepsData = querySnapshot.docs.map(doc => doc.data().steps); // Assuming each document has a `steps` field
      const totalSteps = stepsData.reduce((acc, steps) => acc + steps, 0); // Sum all steps
      setHealthMetrics(prev => ({ ...prev, steps: totalSteps }));
    } catch (error) {
      console.error("Error fetching steps: ", error);
    }
  };

  // Fetch appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'AppointmentRequest'));
        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpcomingEvents(events);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };
    fetchAppointments();
  }, [db]);

  // Fetch steps and update health progress
  useEffect(() => {
    fetchSteps();
  }, [db]);

  // Update health progress whenever health metrics change
  useEffect(() => {
    const progress = calculateHealthProgress();
    setHealthProgress(progress);
  }, [healthMetrics]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Welcome to CareMate</h1>
            <p className="text-xl text-gray-600 mt-2">Your personal care assistant</p>
          </header>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.route}>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer">
                  <div className="text-2xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-3xl font-bold">{feature.count}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Health Overview and Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Health Overview Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Health Overview</h2>
              <p className="text-gray-500 mb-4">Your daily health summary</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold">Overall Health</p>
                <p className="text-green-500 text-2xl font-bold">{healthProgress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${healthProgress}%` }}
                ></div>
              </div>

              {/* New Health Metrics */}
              <div className="mb-4">
                <p className="text-lg font-semibold">Steps: {healthMetrics.steps}</p>
                <p className="text-lg font-semibold">Blood Pressure: {healthMetrics.bloodPressure}</p>
                <p className="text-lg font-semibold">O2 Levels: {healthMetrics.o2Levels}%</p>
                <p className="text-lg font-semibold">Heart Rate: {healthMetrics.heartRate} bpm</p>
              </div>

              <Link to="/health">
                <button
                  className="bg-black text-white px-4 py-2 w-full rounded-lg"
                >
                  Health Data Analysis
                </button>
              </Link>
            </div>

            {/* Upcoming Events Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-gray-500 mb-4">Your schedule for today</p>
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p>No upcoming appointments</p>
                ) : (
                  upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-4">📅</span>
                        <div>
                          <p className="font-semibold">{event.title || "Appointment"}</p>
                          <p className="text-gray-500">{event.date && event.date.toDate().toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="text-gray-400">{">"}</span>
                    </div>
                  ))
                )}
              </div>
              <button className="mt-4 bg-transparent border border-gray-500 text-gray-500 px-4 py-2 w-full rounded-lg">
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
