import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import PreventForwardNavigation from './PreventForwardNavigation';

function SecurityLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3000/SecurityLogin', formData);
    console.log('API Response:', response.data);

    if (response.data.UserName && response.data.Password) {
      // Assuming response.data.Password is the hashed password from the backend
      //const enteredPassword = formData.Password;

      // Compare the hashed password from the response with the entered password
      // if (response.data.Password === enteredPassword) {
      //   console.log('Navigating to SecurityPage');
      //   navigate(`/SecurityPage/${response.data.UserName}`);
      // } else {
      //   alert('Invalid password');
      // }
      console.log('Navigating to SecurityPage');
        navigate(`/SecurityPage/${response.data.UserName}`);
    } else {
      alert('Security Not Found');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }
};

   /*const handleSubmit = async (e) => {
   e.preventDefault();

   try {
      const response = await axios.post('http://localhost:3000/SecurityLogin', formData);
      console.log('API Response:', response.data);
      if (response.data.UserName && response.data.Password===Password) {
        // Redirect to the faculty page and pass the Employee_ID as a parameter
        console.log('Navigating to SecurityPage');
        navigate(/SecurityPage/${response.data.UserName});
      } else {
        alert('Security Not Found');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }

};*/



const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    // backgroundColor: 'rgb(151, 27, 30)',
    // backgroundColor:'#ad1f21',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
  },
  label: {
    marginBottom: '10px',
    width: '100%',
    // color: '#fff', // Text color set to white
  },
  input: {
    padding: '8px',
    marginBottom: '15px',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: 'rgba(55, 85, 40)',
    color: '#fff', // Text color set to white
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px', // Increased font size
  },
  link: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // color:'#fff'
  },

  registerButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#ad1f21', // Change to the desired color
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
  },
  banner: {
    width: '40%', // Adjust the width as needed
    margin: 'auto',
    display: 'flex',
    marginBottom: '20px',
  },
};




return (
  <>
    <br /><br />
    {/* <PreventForwardNavigation /> */}
    <img src="cbit_logo.png" alt="College Banner" style={styles.banner} />
    <br />
    <div style={styles.container}>
      <h2 style={{ ...styles.label, color: 'rgb(160,107,20)', textAlign: 'center', fontSize: '24px' }}>SECURITY LOGIN</h2>
      <br />
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={{ ...styles.label, color: 'rgb(160,107,20)' }}>
          UserName:
          <input style={styles.input} type="text" name="UserName" onChange={handleInputChange} required />
        </label>
        <label style={{ ...styles.label, color: 'rgb(160,107,20)' }}>
          Password:
          <input style={styles.input} type="password" name="Password" onChange={handleInputChange} required />
        </label>
        <button style={styles.button} type="submit">
          Login
        </button>
      </form><br />
      <div style={{ ...styles.link, color: 'rgb(160,107,20)' }}>
        <p>Don't have an account?</p>
        <p style={{ color: '#ad1f21' }}> Contact Admin Office!</p>
      </div>
    </div>
    <br />
  </>
);
};

export default SecurityLogin;