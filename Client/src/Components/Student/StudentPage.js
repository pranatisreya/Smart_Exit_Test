import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function StudentPage() {
  const { rollNo } = useParams();

  const [studentInfo, setStudentInfo] = useState({
    studentName: '',
    rollNo: '',
    branch: '',
    year:'',
    section: '',
    semester: '',
    phoneNumber: '',
    personalEmail: '',
    officialEmail: '',
    parentName: '',
    parentPhoneNumber: '',
    parentEmail: '',
  });

  const [leaveForm, setLeaveForm] = useState({
    rollNo: '', // Add rollNo to the leaveForm state
    reason: '',
    date: '',
    timeSlot: '12:15-01:00',
  });

  const [leaveApplications, setLeaveApplications] = useState([]);


  const handleStatusChange = async (rollNo, newStatus) => {
    try {
      await axios.put(`/StudentLeave/${rollNo}`, { status: newStatus });
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  useEffect(() => {
    console.log('Fetching student data for rollNo:', rollNo);

    axios.get(`/StudentPage/${rollNo}`)
      .then((response) => {
        console.log('Response:', response.data);
        setStudentInfo(response.data);

        // Extract rollNo from the response and set it in leaveForm
        setLeaveForm((prevLeaveForm) => ({
          ...prevLeaveForm,
          rollNo: response.data.rollNo,
        }));
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });

    // Fetch leave applications when the component mounts
    axios.get(`/StudentLeave/${rollNo}`)
      .then((response) => {
        console.log('Leave applications:', response.data);
        setLeaveApplications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leave applications:', error);
      });
  }, [rollNo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm((prevLeaveForm) => ({
      ...prevLeaveForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the leave application data to the server
    axios.post('/StudentLeave', {
      rollNo: leaveForm.rollNo, // Use the actual value, not the type
      reason: leaveForm.reason,
      date: leaveForm.date,
      timeSlot: leaveForm.timeSlot,
      status: 'Pending', // Initial status
      outTime:'N/A'
    })
      .then((response) => {
        console.log('Leave application submitted successfully:', response.data);

      // Fetch updated leave applications after submission
      axios.get(`/StudentLeave/${rollNo}`)
        .then((response) => {
          console.log('Leave applications after submission:', response.data);
          setLeaveApplications(response.data);
        })
        .catch((error) => {
          console.error('Error fetching leave applications:', error);
        });

      // Reset the form after submission
      setLeaveForm({
        rollNo: studentInfo.rollNo, // Set rollNo back to the default value
        reason: '',
        date: '',
        timeSlot: '12:15-01:00',
      });
    })
    .catch((error) => {
      console.error('Error submitting leave application:', error);
    });
  };

  const timeSlots = ['9:10-10:10', '10:10-11:10', '11:10-12:15', '12:15-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00'];

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

    form: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    formGroup: {
      marginBottom: '20px',
    },
    formLabel: {
      marginBottom: '8px',
      color: 'rgb(160, 107, 20)', // Set label color
      display: 'block', // Ensure block display for the label
    },
    formInput: {
      width: '100%',
      padding: '8px',
      marginBottom: '12px',
      boxSizing: 'border-box',
    },
    formTextarea: {
      width: '100%',
      padding: '8px',
      marginBottom: '12px',
      boxSizing: 'border-box',
    },
    formSelect: {
      width: '100%',
      padding: '8px',
      marginBottom: '12px',
      boxSizing: 'border-box',
    },
    formButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  
  };
  


  const styling = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
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
      backgroundColor: 'rgba(160,107,20,0.3)',
      color:'#ad1f21'
    },
    td: {
      border: '1px solid #000000',
      padding: '8px',
      textAlign: 'left',
    },
    button: {
      padding: '5px',
      backgroundColor: '#fff',
      color: '#fff', 
      cursor: 'pointer',
      border : 'groove',
      borderRadius: '5px',
      fontSize: '16px', 
    }
  };

  return (
    <>
      <Navbar />
      <br /><br />
      <div style={styles.container}>
        <h2 style={styles.heading}>Student Information</h2>
        <ul style={styles.infoList}>
          {Object.entries(studentInfo).map(([key, value],index) => (
            <li key={key} style={{
              ...styles.infoListItem,
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Alternating colors
            }}>
              {['studentName', 'rollNo', 'branch', 'year', 'section', 'semester', 'phoneNumber', 'personalEmail', 'officialEmail', 'parentName', 'parentPhoneNumber', 'parentEmail'].includes(key) && (
                <>
                  <strong style={{ color: index % 2 === 0 ? '#ad1f21' : 'rgb(160,107,20)'}}>{key}:</strong> {value || 'N/A'}
                  <br />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <br></br>

      <div style={styles.container}>
        <h2 style={styles.heading}>Leave Application</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>
              Reason for Leave:
              <textarea
                name="reason"
                value={leaveForm.reason}
                onChange={handleInputChange}
                required
                rows="2"
              />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={leaveForm.date}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label>
              Time Slot:
              <select
                name="timeSlot"
                value={leaveForm.timeSlot}
                onChange={handleInputChange}
                required
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <button type="submit">Submit Leave Application</button>
          </div>
        </form>
      </div>
      <br />


      <div style={styling.container}>
        <h2 style={styling.heading}>Previous Leave Applications</h2>
        {leaveApplications.length > 0 ? (
          // <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <table style={styling.table}>
            <thead>
              <tr>
                <th style={styling.th}>Index</th>
                <th style={styling.th}>Reason</th>
                <th style={styling.th}>Date</th>
                <th style={styling.th}>Time Slot</th>
                <th style={styling.th}>Status</th>
                <th style={styling.th}>out time</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((application, index) => (
                <tr key={application._id}>

                  <td style={styling.td}>{index + 1}</td>
                  <td style={styling.td}>{application.reason}</td>
                  <td style={styling.td}>{application.date}</td>
                  <td style={styling.td}>{application.timeSlot}</td>
                  <td style={styling.td}>{application.status}</td>
                  <td style={styling.td}>{application.outTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No previous leave applications found.</p>
        )}
      </div>
    </>
  );
}

export default StudentPage;