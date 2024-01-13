import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function StudentPage() {
  const { rollNo } = useParams();

  const [studentInfo, setStudentInfo] = useState({
    // ... (other properties)
  });

  const [leaveForms, setLeaveForms] = useState([]);

  useEffect(() => {
    // Fetch student data and leave forms when the component mounts
    fetchData();
  }, [rollNo]);

  const fetchData = async () => {
    try {
      // Fetch student data
      const studentResponse = await axios.get(`/StudentPage/${rollNo}`);
      setStudentInfo(studentResponse.data);

      // Fetch leave forms for the student
      const leaveFormsResponse = await axios.get(`/StudentLeave/${rollNo}`);
      setLeaveForms(leaveFormsResponse.data);
    } catch (error) {
      console.error('Error fetching student data or leave forms:', error);
    }
  };

  const styles = {
    // ... (your styles)
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Student Information</h2>
        {/* Display student information here */}
      </div>
      <br></br>

      <div style={styles.container}>
        <h2 style={styles.heading}>Leave Forms</h2>
        {/* Display leave forms here */}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Reason</th>
              <th scope="col">Date</th>
              <th scope="col">Time Slot</th>
              {/* Add other columns as needed */}
            </tr>
          </thead>
          <tbody>
            {leaveForms.map((leaveForm) => (
              <tr key={leaveForm._id}>
                <td>{leaveForm.reason}</td>
                <td>{leaveForm.date}</td>
                <td>{leaveForm.timeSlot}</td>
                {/* Add other columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentPage;
