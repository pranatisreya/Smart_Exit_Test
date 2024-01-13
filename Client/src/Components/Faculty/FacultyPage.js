import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StudentDetails from './StudentDetails';

function FacultyPage() {
  const { Employee_ID } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [facultyInfo, setFacultyInfo] = useState({
    Employee_ID: '',
    Name: '',
    Department: '',
    Year: '',
    Class: '',
    Section: '',
    PersonalMail: '',
    OfficialMail: '',
    PhoneNumber: '',
  });
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);

  
  const closeStudentDetails = () => {
    setSelectedStudentDetails(null);
    setShowStudentDetails(false);
  };


  const [studentDetails, setStudentDetails] = useState(null);

  const openStudentDetailsPopup = async (studentDetails) => {
    setSelectedStudentDetails(studentDetails);
    setShowStudentDetails(true);
  };
  

  const fetchFacultyDetails = async () => {
    try {
      const response = await axios.get(`/FacultyPage/${Employee_ID}`);
      console.log('Response from server:', response.data);
      setFacultyInfo(response.data);
    } catch (error) {
      console.error('Error fetching faculty details:', error);
      setError('An error occurred while fetching faculty details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get(`/FacultyLeave/${Employee_ID}`);
      console.log('Leave applications:', response.data);

      // Update the state with the correct data
      setLeaveApplications(response.data.leaveApplications);
      setStudentDetails(response.data.studentData);
    } catch (error) {
      console.error('Error fetching leave applications:', error);
      setError('An error occurred while fetching leave applications.');
    } finally {
      setLoading(false);
    }
  };

  const getLeaveData = () => {
    const data = { section, semester };
    fetch('StudentGatePass_db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setLeaveData(result);
      });
  };

  useEffect(() => {
    fetchFacultyDetails();
    fetchLeaveApplications();
  }, [Employee_ID]);

  useEffect(() => {
    getLeaveData();
  }, [section, semester]);

  const handleStatusChange = async (application, newStatus) => {
    try {
      if (application.status === 'Approved') {
        alert('This leave application has already been Approved. No action taken.');
        return;
      }
  
      if (application.status === 'Rejected') {
        alert('This leave application has already been Rejected. No action taken.');
        return;
      }

      const data={
        status:newStatus,
        studentDetails:{
          rollNo:application.rollNo,
          reason: application.reason,
          date: application.date,
          timeSlot: application.timeslot,
          //outTime:application.outTime
        }
      }
      await axios.put(`/FacultyLeave/${application.rollNo}`, data);

      // Update the local state to reflect the status change
      setLeaveApplications((prevApplications) =>
        prevApplications.map((prevApplication) =>
          prevApplication.rollNo === application.rollNo
          && prevApplication.date === application.date 
          && prevApplication.reason === application.reason
          && prevApplication.timeslot===application.timeslot
            ? { ...prevApplication, status: newStatus }
            : prevApplication
        )
      );

      alert(`Leave application has been ${newStatus === 'Approved' ? 'Approved' : 'Rejected'}.`);
      console.log('Leave application status updated:', {
        ...application,
        status: newStatus,
      });

    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color:'rgb(160,107,20)'
    },
    infoList: {
      listStyleType: 'none',
      padding: '0',
    },
    infoListItem: {
      marginBottom: '10px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      border: '1px solid #000000',
      padding: '8px',
      textAlign: 'left',
      backgroundColor: '#fff',
      color:'#ad1f21'
    },
    td: {
      border: '1px solid #000000',
      padding: '8px',
      textAlign: 'left',
    },
    button: {
      padding: '2px',
      backgroundColor: '#fff',
      color: '#fff', // Text color set to white
      cursor: 'pointer',
      border : 'groove',
      borderRadius: '5px',
      fontSize: '16px', // Increased font size
    }
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.heading}>Faculty Information</h2>
          <ul style={styles.infoList}>
            {Object.entries(facultyInfo).map(([key, value]) => (
              <li key={key} style={styles.infoListItem}>
                {value && (
                  <>
                    {key === 'Year' && <div><br />Class Incharge:</div>}
                    {key !== 'Personal_Mail' && key !== 'Official_Mail' && key !== 'Phone Number' && (
                      <>
                        <span style={{ color: '#ad1f21' }}>{key} :</span>
                        {key === 'Year' || key === 'Class' || key === 'Section' ? (
                          <span style={{ color: 'rgba(55, 85, 40)' }}> {value}</span>
                        ) : (
                          <span> {value}</span>
                        )}
                        <br />
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
      </div>

      <br />

      <div style={styles.container}>
        <h2 style={styles.heading}>Leave Applications</h2>
        {leaveApplications.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Index</th>
                <th style={styles.th}>Roll No.</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time Slot</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>outTime</th>
                <th style={styles.th}>Actions</th>
                <th style={styles.th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((application, index) => (
                <tr key={application._id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={{...styles.td,color:'rgb(160,107,20)'}}>{application.rollNo}</td>
                  <td style={styles.td}>{application.reason}</td>
                  <td style={styles.td}>{application.date}</td>
                  <td style={styles.td}>{application.timeSlot}</td>
                  <td style={{ ...styles.td, 
                                color: application.status === 'Approved' ? 'rgba(55, 85, 40)' : application.status === 'Rejected' ? '#ad1f21' : 'black' }}>
                    {application.status}</td>
                  <td style={styles.td}>{application.outTime}</td>

                  <td style={styles.td}>
                    {application.status === 'Pending' && (
                      <>
                        <button
                          style={{...styles.button,color:'rgba(55, 85, 40)'}}
                          onClick={() => handleStatusChange(application, 'Approved')}
                        >
                          Approve 
                        </button>
                        <button
                          style={{...styles.button,color:'#ad1f21'}}
                          onClick={() => handleStatusChange(application, 'Rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, color: 'rgb(160,107,20)' }}
                      onClick={() => openStudentDetailsPopup(application)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leave applications found.</p>
        )}
      </div>
      {/* Student Details Popup */}
      {showStudentDetails && (
        <StudentDetails
          studentDetails={selectedStudentDetails}
          onClose={closeStudentDetails}
        />
      )}
    </>
  );
}

export default FacultyPage;
