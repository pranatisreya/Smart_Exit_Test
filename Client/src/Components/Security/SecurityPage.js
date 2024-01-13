import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function SecurityPage() {
  const { UserName } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showLeaveDetails, setShowLeaveDetails] = useState(false);
  const [selectedLeaveDetails, setSelectedLeaveDetails] = useState(null);


  const [securityInfo, setSecurityInfo] = useState({
    UserName: '',
    Password: '',
    Email: '',
    PhoneNumber: '',
    // Add other fields as needed
  });



  const fetchSecurityDetails = async () => {
    try {
      const response = await axios.get(`/SecurityPage/${UserName}`);
      console.log('Response from server:', response.data);
      setSecurityInfo(response.data);
    } catch (error) {
      console.error('Error fetching Security details:', error);
      setError('An error occurred while fetching Security details.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSecurityDetails();
  }, [UserName]);


  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get(`/SecurityLeave/${UserName}`);  // Adjust the endpoint accordingly
      console.log('Leave applications:', response.data.leaveApplications);

      // Update the state with the correct data
      setLeaveApplications(response.data.leaveApplications);
    } catch (error) {
      console.error('Error fetching leave applications:', error);
      setError('An error occurred while fetching leave applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityDetails();
    fetchLeaveApplications();
  }, [UserName]);

  



  const handleOutTimeRecord = async (application, newOutTime) => {
    try {
      
  
      const data = {
        status: newOutTime,
        LeaveDetails:{
          rollNo: application.rollNo,
          reason: application.reason,
          date: application.date,
          timeSlot: application.timeSlot,
        },
      };
      console.log(application.reason)
  
      // Update the out time for the specific student
      await axios.put(`/SecurityLeave/${application.rollNo}`, data);
  
      // Update the local state to reflect the outTime recording
      setLeaveApplications((prevApplications) =>
        prevApplications.map((prevApplication) =>
          prevApplication.rollNo === application.rollNo &&
          prevApplication.date === application.date &&
          prevApplication.reason === application.reason &&
          prevApplication.timeSlot === application.timeSlot
            ? { ...prevApplication, 
              outTime: 
                newOutTime === 'Yes'
                // ? new Date().toLocaleTimeString([], { hour12: false }) + ' ' + new Date().toString()
                ?new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata', // Set the timezone to India
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                : 'Did not leave',
               }
            : prevApplication
        )
      );
      if (application.outTime!=='Did not leave') {
        alert('This student has left the college.');
        return;
      }
      if (application.outTime === 'Did not leave') {
        alert('This student has not left the college.');
        return;
      }
  

    } catch (error) {
      console.error('Error recording out time:', error);
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
      color: 'rgb(160,107,20)',
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
      color: '#ad1f21',
    },
    td: {
      border: '1px solid #000000',
      padding: '8px',
      textAlign: 'left',
    },
    button: {
      padding: '2px',
      backgroundColor: '#fff',
      color: '#fff', 
      cursor: 'pointer',
      border: 'groove',
      borderRadius: '5px',
      fontSize: '16px', 
    },
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.heading}>Security Information</h2>
        <ul style={styles.infoList}>
          {Object.entries(securityInfo).map(([key, value],index) => (
            <li key={key} style={{...styles.infoListItem ,listStyleType: 'none'            }}>
              {['UserName','Email','PhoneNumber'].includes(key) && (
                <>
                  <strong style={{ color: index % 2 === 0 ? '#ad1f21' : 'rgb(160,107,20)'}}>{key}:</strong> {value || 'N/A'}
              <br />
              </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <br />

      <div style={styles.container}>
        <h2 style={styles.heading}>Leave Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : leaveApplications.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Index</th>
                <th style={styles.th}>Roll No.</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time-Slot</th>
                <th style={styles.th}>Out-Time</th> 
                <th style={styles.th}>Mark as Out</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((application, index) => (
                <tr key={application._id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={{ ...styles.td, color: 'rgb(160,107,20)' }}>{application.rollNo}</td>
                  <td style={styles.td}>{application.reason}</td>
                  <td style={styles.td}>{application.date}</td>
                  <td style={styles.td}>{application.timeSlot}</td>
                  <td style={styles.td}>{application.outTime}</td>
                  
                  <td style={styles.td}>
                    {application.outTime==='N/A' && (
                      <>
                        <button
                          style={{...styles.button,color:'rgba(55, 85, 40)'}}
                          onClick={() => handleOutTimeRecord(application, 'Yes')}
                        >
                          Yes 
                        </button>
                        <button
                          style={{...styles.button,color:'#ad1f21'}}
                          onClick={() => handleOutTimeRecord(application, 'No')}
                        >
                          No
                        </button>
                      </>
                    )}
                  </td>
                  {/* <td style={styles.td}>
                    <button
                      style={{ ...styles.button, color: 'rgba(55, 85, 40)' }}
                      onClick={() => handleOutTimeRecord(application)}
                    >
                      Mark as Out
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leave applications found.</p>
        )}
      </div>
    </>
  );
}

export default SecurityPage;