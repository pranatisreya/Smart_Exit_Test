// StudentDetailsPopup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetails = ({ studentDetails, onClose }) => {
  const [fetchedDetails, setFetchedDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch student details when the component mounts or when studentDetails changes
    if (studentDetails && studentDetails.rollNo) {
      const fetchStudentDetails = async () => {
        try {
          const response = await axios.get(`/StudentDetails/${studentDetails.rollNo}`);
          console.log('Student details:', response.data);

          // Update the state with the fetched student details
          setFetchedDetails(response.data);
        } catch (error) {
          console.error('Error fetching student details:', error);
          setError('An error occurred while fetching student details.');
        }
      };

      fetchStudentDetails();
    }
  }, [studentDetails]);


  const {
    studentName,
    rollNo,
    branch,
    year,
    section,
    semester,
    phoneNumber,
    personalEmail,
    officialEmail,
    parentName,
    parentPhoneNumber,
    parentEmail,
    registrationDate,
  } = fetchedDetails || studentDetails;

  return (
    <div style={styles.overlay}>
    <div style={styles.popupContainer}>
      <h2 style={styles.popupHeading}>Student Details</h2>
      <div style={styles.detailsContainer}>
        <div style={styles.detailItem}>
          <strong>Name:</strong> {studentName}
        </div>
        <div style={styles.detailItem}>
          <strong>Roll No:</strong> {rollNo}
        </div>
        <div style={styles.detailItem}>
          <strong>Branch:</strong> {branch}
        </div>
        <div style={styles.detailItem}>
          <strong>Year:</strong> {year}
        </div>
        <div style={styles.detailItem}>
          <strong>Section:</strong> {section}
        </div>
        <div style={styles.detailItem}>
          <strong>Semester:</strong> {semester}
        </div>
        <div style={styles.detailItem}>
          <strong>Phone Number:</strong> {phoneNumber}
        </div>
        <div style={styles.detailItem}>
          <strong>Personal Email:</strong> {personalEmail}
        </div>
        <div style={styles.detailItem}>
          <strong>Official Email:</strong> {officialEmail}
        </div>
        <div style={styles.detailItem}>
          <strong>Parent Name:</strong> {parentName}
        </div>
        <div style={styles.detailItem}>
          <strong>Parent Phone Number:</strong> {parentPhoneNumber}
        </div>
        <div style={styles.detailItem}>
          <strong>Parent Email:</strong> {parentEmail}
        </div>
        <div style={styles.detailItem}>
          <strong>Registration Date:</strong> {new Date(registrationDate).toLocaleDateString()}
        </div>
      </div>
      <button style={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Set a high z-index to appear on top of other elements
  },
  popupContainer: {
    maxWidth: '600px',
    width:'500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  },
  popupHeading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'rgb(160, 107, 20)',
  },
  detailsContainer: {
    marginBottom: '20px',
  },
  detailItem: {
    marginBottom: '10px',
  },
  closeButton: {
    padding: '10px',
    backgroundColor: '#fff',
    color: 'rgb(160, 107, 20)',
    cursor: 'pointer',
    border: 'groove',
    borderRadius: '5px',
    fontSize: '16px',
  },
};

export default StudentDetails;
