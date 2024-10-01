import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { collection, getDocs, doc, deleteDoc, addDoc, getDoc, updateDoc } from 'firebase/firestore';
import './Appointment.css';
import Navbar from './Navbar';


const Appointments = () => {
  const { db } = useFirebase();
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'AppointmentRequest'));
        const requests = await Promise.all(querySnapshot.docs.map(async (docSnap) => {
          const requestData = docSnap.data();
          const patientDoc = await getDoc(doc(db, 'Patients', requestData.patientuid));
          const patientName = patientDoc.exists() ? patientDoc.data().name : 'Unknown Patient';

          return {
            id: docSnap.id,
            patientName,
            ...requestData
          };
        }));
        setAppointmentRequests(requests);

        const acceptedSnapshot = await getDocs(collection(db, 'Appointment'));
        const accepted = acceptedSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
        setAcceptedAppointments(accepted);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [db]);

  const acceptAppointment = async (id, appointment) => {
    try {
      const selectedTime = selectedTimes[id];
      if (!selectedTime) {
        alert('Please select a time before accepting the appointment.');
        return;
      }

      const appointmentRef = doc(db, 'AppointmentRequest', id);
      const newAppointment = {
        ...appointment,
        status: 'Accepted',
        time: selectedTime,
      };

      const appointmentCollection = collection(db, 'AppointmentRequest');
      await updateDoc(appointmentRef, newAppointment);
     

      setStatusUpdates({
        ...statusUpdates,
        [id]: 'Accepted',
      });

      setAcceptedAppointments([...acceptedAppointments, newAppointment]);
      setAppointmentRequests(appointmentRequests.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error accepting appointment: ', error);
    }
  };

  const rejectAppointment = async (id) => {
    try {
      const appointmentRef = doc(db, 'AppointmentRequest', id);
      await deleteDoc(appointmentRef);

      setStatusUpdates({
        ...statusUpdates,
        [id]: 'Rejected',
      });

      setAppointmentRequests(appointmentRequests.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error rejecting appointment: ', error);
    }
  };

  const handleTimeChange = (id, event) => {
    setSelectedTimes({
      ...selectedTimes,
      [id]: event.target.value,
    });
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="appointments-container">
        <h1>Appointment Requests</h1>
        <div className="appointment-list">
          {appointmentRequests.length === 0 ? (
            <p>No appointment requests available</p>
          ) : (
            appointmentRequests.map(({ id, patientName, doctoruid, appointmentType, date, status }) => {
              const formattedDate = date?.toDate().toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={`request-${id}`} className="appointment-card">
                  <h2>Patient: {patientName}</h2>
                  <p><strong>Doctor UID:</strong> {doctoruid}</p>
                  <p><strong>Appointment Type:</strong> {appointmentType}</p>
                  <p><strong>Date:</strong> {formattedDate}</p>
                  <p><strong>Status:</strong> {statusUpdates[id] || status}</p>

                  {statusUpdates[id] ? (
                    <p className={`status-message ${statusUpdates[id].toLowerCase()}`}>
                      This appointment was {statusUpdates[id].toLowerCase()}.
                    </p>
                  ) : (
                    <>
                      <div className="time-selection">
                        <label htmlFor={`time-${id}`}>Select Time:</label>
                        <input
                          type="datetime-local"
                          id={`time-${id}`}
                          value={selectedTimes[id] || ''}
                          onChange={(event) => handleTimeChange(id, event)}
                        />
                      </div>
                      <div className="button-container">
                        <button className="accept-button" onClick={() => acceptAppointment(id, { ...appointmentRequests.find(req => req.id === id) })}>
                          Accept
                        </button>
                        <button className="reject-button" onClick={() => rejectAppointment(id)}>Reject</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        <h1>Accepted Appointments</h1>
        <div className="accepted-appointment-list">
          {acceptedAppointments.length === 0 ? (
            <p>No accepted appointments</p>
          ) : (
            acceptedAppointments.map(({ id, patientName, doctoruid, appointmentType, time }) => {
              const formattedTime = new Date(time).toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={`accepted-${id}`} className="appointment-card">
                  <h2>Patient: {patientName}</h2>
                  <p><strong>Doctor UID:</strong> {doctoruid}</p>
                  <p><strong>Appointment Type:</strong> {appointmentType}</p>
                  <p><strong>Time:</strong> {formattedTime}</p>
                  <div className="video-call-section">
                    <button className="video-call-button">
                      Start Video Call
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Appointments;
