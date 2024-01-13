import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentVerification({studentDetails,onClose}) {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hovered, setHovered] = useState(false);
  const { personalEmail, formData } = studentDetails;
  // const { personalEmail } = useParams();
  // const { state } = useLocation();
  // const formData = state ? state.formData : null;

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {

      console.log('Sending request with data:', {
        personalEmail,
        enteredOTP: verificationCode,
        formData
      });

      const response = await axios.post(`/StudentVerify`, {
        personalEmail,
        enteredOTP: verificationCode,
        formData
      });
      console.log('Server Response:', response.data);

      if (response.data === 'verified') {
        alert('Student registered');
        navigate('/StudentLogin');
      } else if(response.data === 'notverified'){
        alert('Incorrect OTP. Please try again');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
    }
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
    formContainer: {
      maxWidth: '400px',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgb(0,0,0,0.2)',
      backgroundColor: '#fff', // White background for the form container
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'rgb(160,107,20)',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      backgroundColor: '#ad1f21',
      color: '#fff',
      border: 'none',
      transition: 'background-color 0.3s',
      marginTop: '10px',
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '14px',

    },
    buttonHover: {
      backgroundColor: 'rgba(55, 85, 40)',
    },
    formGroup: {
      marginBottom: '20px',
    },
  };


  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>OTP Verification</h2>
        <form>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Verification Code:
              <input
                type="text"
                name="verificationCode"
                onChange={handleVerificationCodeChange}
                style={styles.input}
                required
              />
            </label>
          </div>
          <span style={{ margin: '0 20px' }}></span>
          <button
            type="submit"
            style={{ ...styles.button, ...(hovered ? styles.buttonHover : null) }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
          <span style={{ margin: '0 50px' }}></span>
          <button style={{ ...styles.button, }} onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentVerification;
