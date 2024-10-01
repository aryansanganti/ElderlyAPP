import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useFirebase } from "../context/Firebase"; // Use context to access Firebase

const Reminders = () => {
  const { user, db } = useFirebase(); // Get the logged-in user and Firestore database
  const [reminder, setReminder] = useState("");
  const [reminders, setReminders] = useState([]);
  const [editReminderId, setEditReminderId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (user) {
      fetchReminders(); // Fetch reminders when the user is authenticated
    }
  }, [user]);

  // Fetch reminders specific to the logged-in user
  const fetchReminders = async () => {
    if (!user) return; // Prevent fetching if no user is logged in

    const q = query(collection(db, "reminders"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const remindersArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReminders(remindersArray);
  };

  // Add a reminder for the specific user
  const addReminder = async () => {
    if (!user) return;

    await addDoc(collection(db, "reminders"), {
      title: reminder,
      userId: user.uid, // Link reminder to the user
      createdAt: new Date(),
    });
    setReminder("");
    fetchReminders(); // Refresh the list
  };

  // Update a reminder
  const updateReminder = async (id) => {
    if (!user) return;

    const reminderRef = doc(db, "reminders", id);
    await updateDoc(reminderRef, { title: newTitle });
    setEditReminderId(null);
    setNewTitle("");
    fetchReminders(); // Refresh the list
  };

  // Delete a reminder
  const deleteReminder = async (id) => {
    if (!user) return;

    const reminderRef = doc(db, "reminders", id);
    await deleteDoc(reminderRef);
    fetchReminders(); // Refresh the list
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Reminders</h1>
      <input
        type="text"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        placeholder="Add a reminder"
        style={styles.input}
      />
      <button onClick={addReminder} style={styles.addButton}>
        Add Reminder
      </button>

      <ul style={styles.reminderList}>
        {reminders.map((item) => (
          <li key={item.id} style={styles.reminderItem}>
            {editReminderId === item.id ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Update reminder"
                  style={styles.input}
                />
                <button onClick={() => updateReminder(item.id)} style={styles.saveButton}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={styles.reminderText}>{item.title}</span>
                <div style={styles.buttonGroup}>
                  <button onClick={() => setEditReminderId(item.id)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => deleteReminder(item.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    background: "#f0f4f7",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #ccc",
    width: "70%",
    marginRight: "10px",
    fontSize: "1rem",
  },
  addButton: {
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  addButtonHover: {
    backgroundColor: "#218838",
  },
  reminderList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "20px",
  },
  reminderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
  },
  reminderText: {
    fontSize: "1.2rem",
    color: "#333",
    flex: 1,
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  deleteButton: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  saveButton: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default Reminders;
