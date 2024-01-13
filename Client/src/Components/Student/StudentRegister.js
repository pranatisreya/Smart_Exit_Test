import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentVerification from './StudentVerification';


function StudentRegister() {
  const history=useNavigate();

  const [formData, setFormData] = useState({
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
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  let allErrors = ''; 
  const [hovered, setHovered] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [studentDetailsForVerification, setStudentDetailsForVerification] = useState({
    personalEmail: '',
    formData: {},
  });
  

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formData.studentName ||
      !formData.rollNo ||
      !formData.branch ||
      !formData.year ||
      !formData.section ||
      !formData.semester ||
      !formData.phoneNumber ||
      !formData.personalEmail ||
      !formData.officialEmail ||
      !formData.parentName ||
      !formData.parentEmail ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      //setErrorMessage('Please fill in all fields');
      //return;
      allErrors += 'Please fill in all fields\n';
    }

    if (formData.rollNo.length !== 12) {
      allErrors += 'Roll number must be exactly 12 characters.\n format 1601+yy+ddd(branch code)+ddd(roll no.). \n\n';
    }


    if (formData.password !== formData.confirmPassword) {
      //setErrorMessage('Passwords do not match');
      allErrors += 'Passwords do not match.\n\n';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      //setErrorMessage('Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one special character');
      allErrors += 'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one special character.\n';
    }



    // Concatenate the new error messages with the existing ones in errorMessage state
    //setErrorMessage((prevErrors) => prevErrors + allErrors.trim());
    setErrorMessage(allErrors)
    // If there are any errors, return without further processing
    if (allErrors) {
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/StudentRegister', formData);
  
      if (response.data === 'exist') {
        alert('Student already registered');
        navigate('/StudentLogin');
      } else if (response.data === 'notexist') {
        // Registration successful, redirect to Verification page
        //navigate(`/StudentVerification/${formData.personalEmail}`, {state:{formData}});
        setStudentDetailsForVerification({
          personalEmail: formData.personalEmail,
          formData: formData,
        });
        setShowVerificationPopup(true);

      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  


  const styles = {
    formContainer: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgb(0,0,0,0.2)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color:'rgb(160,107,20)'
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
    select: {
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
      transition: 'background-color 0.3s', // Add transition for a smooth effect
      position:'centre',
      marginTop: '10px',
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '14px',
    },

    buttonHover: {
      backgroundColor: 'rgba(55, 85, 40)', // Change the background color on hover
    },

    formGroup: {
      marginBottom: '20px',
    },
  };



  return (
    <>
    <br/>
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Student Registration</h2>
      <form action="POST" onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Name:
            <input type="text" name="studentName" onChange={handleInputChange} style={styles.input} required/>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Roll No:
            <input type="text" name="rollNo" onChange={handleInputChange} style={styles.input} required/>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Branch:
            <select name="branch" onChange={handleInputChange} value={formData.branch} style={styles.select} required>
              <option value="">Select Branch</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="mech">Mechanical</option>
              <option value="eee">EEE</option>
              <option value="ece">ECE</option>
              <option value="civil">Civil</option>
              <option value="cse-aiml">CSE - AIML</option>
              <option value="cse(iotcsbc)">CSE (IoT & CSBC)</option>
              <option value="ai&ds">AI & DS</option>
              <option value="chemical">Chemical</option>
              <option value="bio-tech">Bio-Tech</option>
            </select>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Year:
            <select name="year" onChange={handleInputChange} value={formData.year} style={styles.select} required>
              <option value="">Select Year</option>
              <option value="1">fisrt</option>
              <option value="2">second</option>
              <option value="3">third</option>
              <option value="4">fourth</option>
            </select>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            {/* Section:
            <input type="text" name="section" onChange={handleInputChange} style={styles.input} required/> */}
            <select name="section" onChange={handleInputChange} value={formData.section} style={styles.select} required>
              <option value="">Select Section</option>
              <option value="A1">Civil 1 (A1)</option>
              <option value="A2">Civil 2 (A2)</option>
              <option value="B">Chemical (B)</option>
              <option value="C1">CSE 1 (c1)</option>
              <option value="C2">CSE 2 (C2)</option>
              <option value="C3">CSE 3 (C3)</option>
              <option value="C4">CSM (C4)</option>
              <option value="C5">CIC (C5)</option>
              <option value="D1">EEE 1 (D1)</option>
              <option value="D2">EEE 2 (D2)</option>
              <option value="D3">EEE 3 (D3)</option>
              <option value="E1">ECE 1 (E1)</option>
              <option value="E2">ECE 2 (E2)</option>
              <option value="E3">ECE 3 (E3)</option>
              <option value="F1">Mechanical 1 (F1)</option>
              <option value="F2">Mechanical 2 (F2)</option>
              <option value="H1">IT 1 (H1) </option>
              <option value="H2">IT 2 (H2) </option>
              <option value="H3">IT 3 (H3) </option>
              <option value="I1">AIDS 1 (I1)</option>
              <option value="I1">AIDS 2 (I1)</option>
              <option value="J">AIM (J)</option>
              <option value="K">Bio-Tech (K)</option>
            </select>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Semester:
            <select name="semester" onChange={handleInputChange} value={formData.semester} style={styles.select} required>
              <option value="">Select Semester</option>
              <option value="i">I</option>
              <option value="ii">II</option>
              <option value="iii">III</option>
              <option value="iv">IV</option>
              <option value="v">V</option>
              <option value="vi">VI</option>
              <option value="vii">VII</option>
              <option value="viii">VIII</option>
            </select>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Phone Number:
            <input type="text" name="phoneNumber" onChange={handleInputChange} style={styles.input} required />
          </label>
        </div>


        <div style={styles.formGroup}>
          <label style={styles.label}>
            Personal Email:
            <input type="email" name="personalEmail" onChange={handleInputChange} style={styles.input} required/>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Official Email:
            <input type="email" name="officialEmail" onChange={handleInputChange} style={styles.input} required/>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Parent Name:
            <input type="text" name="parentName" onChange={handleInputChange} style={styles.input} required/>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Parent Phone Number:
            <input type="text" name="parentPhoneNumber" onChange={handleInputChange} style={styles.input} required/>
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Parent Email:
            <input type="email" name="parentEmail" onChange={handleInputChange} style={styles.input} required />
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Password:
            <input type="password" name="password" onChange={handleInputChange} style={styles.input} required />
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Confirm Password:
            <input type="password" name="confirmPassword" onChange={handleInputChange} style={styles.input} required/>
          </label>
        </div>

        <button
          type="submit"
          style={{ ...styles.button, ...(hovered ? styles.buttonHover : null) }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Submit
        </button>
      </form>
    </div>
    <br/>

    {/* Display error message to the user */}
    {/* {errorMessage && <div style={{ color: '#ad1f21', textAlign: 'center' }}>{errorMessage}</div>}
      <br /> */}

      <div style={{ whiteSpace: 'pre-line' }}>
        {errorMessage && <p style={{...styles.formContainer, color: '#ad1f21',textAlign: 'center' }}>{errorMessage}</p>}
      </div>


      {/* Student Verification Popup */}
      {showVerificationPopup && (
        <StudentVerification
          studentDetails={studentDetailsForVerification}
          onClose={() => setShowVerificationPopup(false)}
        />
      )}
      <br />

    </>
  );
}

export default StudentRegister;
