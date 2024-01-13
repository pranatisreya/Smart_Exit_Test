import React from 'react';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import studt from "../assets/student.jpeg";
import faclt from "../assets/faculty.jpg";
import secut from "../assets/security.jpg";

const Home = () => {

  const navigate = useNavigate();

  const styles = {
    header: {
      color: '#375528', 
      textAlign:'centre',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    buttonText: {
      textAlign: 'center',
      color: '#971b1e', // Set text color to dark red
    },
    button: {
      padding: '5px',
      backgroundColor: 'rgb(160,107,20)',
      color: '#fff', // Text color set to white
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px', // Increased font size
    },
  };

    
  const footerStyle = {
    backgroundColor: '#d9d5d4', // Set the background color
    color: '#333',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
    lineHeight: '1', // Adjust line spacing
    position: 'fixed', // Set the position to fixed
    bottom: '0', // Align the footer to the bottom of the viewport
    width: '100%', // Full width of the viewport
    height:'30%'
  };
  

  const infoTextStyle = {
    fontWeight: 'bold', // Make the text bold
  };


  const handleStudentClick = () => {
    navigate('/StudentLogin');
  };

  const handleFacultyClick = () => {
    navigate('/FacultyLogin');
  };

  const handleSecurityClick = () => {
    navigate('/SecurityLogin');
  };

  return (


    <div>
      <br />
      {/* <img
          src="SmartExit.jpg"
          alt="SMART EXIT : An Online GatePass System for CBIT Stdents"
          style={{
            width: '100%',
            maxWidth: '10%', 
            height: '10%',
            display: 'block',
            margin: '0 auto', // Center the image
          }}        
          />
      <br />
      <div style={styles.logo}>
        <img
          src="CBIT-LOGO-2023.png"  
          alt="Your App"
          style={{ width: '70%', maxWidth: '70%', height: 'auto' }}
        />
      </div> */}

      <div style={{ display: 'flex',  width: '75%', 
      margin: '0 auto', borderTop: '2px solid #a16b15',
       borderBottom: '2px solid #a16b15',boxSizing: 'border-box' ,
       marginTop: '10px'
       }}>
        <img
          src="SmartExit.jpg"
          alt="SMART EXIT: An Online GatePass System for CBIT Students"
          style={{
            width: '30%', // Adjust the width as needed
            height: '20%',
            paddingLeft:'40px',
            paddingTop:'5px'
          }}
        />
        <img
          src="CBIT-LOGO-2023.png"  
          alt="Your App"
          style={{ width: '60%', height: 'auto', paddingLeft:'50px' }}
        />
      </div>


      <br/><br/>
      <div className="container" style={styles.buttonContainer}>
        <div className="button_text" style={styles.buttonText}>
          <button style={{...styles.button,backgroundColor: 'rgb(160,107,20)'}} onClick={handleStudentClick}>
            <img className="imge" src={studt} alt="Student Login" style={{ width: '128px', height: '128px' }} />
            <div className="button_label">Student</div>
          </button>
        </div>
        <div className="button_text" style={styles.buttonText}>
          <button style={{...styles.button,backgroundColor:'rgb(160,107,20)'}} onClick={handleFacultyClick}>
            <img className="imge" src={faclt} alt="Faculty Login" style={{ width: '128px', height: '128px' }} />
            <div className="button_label">Faculty</div>
          </button>
        </div>
        <div className="button_text" style={styles.buttonText}>
          <button style={styles.button} onClick={handleSecurityClick}>
            <img className="imge" src={secut} alt="Security Login" style={{ width: '128px', height: '128px' }} />
            <div className="button_label">Security</div>
          </button>
        </div>
      </div>

      <footer style={footerStyle}>
        {/* College Logo */}
        

        <div style={{ textAlign: 'left', flex: 1 }}>
          <p style={infoTextStyle}>College Contact Info</p>
          <p>Gandipet, Hyderabad, Telangana, PIN: 500075</p>
          <p>Phone: 040-24193276</p>
          <p>Mobile: 8466997201</p>
          <p>For Admissions Enquiry: 8466997216</p>
          <p>Email: principal@cbit.ac.in</p>
        </div>
        <div style={{ textAlign: 'right', flex: 1 }}>
          <img
            src="CBIT-LOGO-2023.png"
            alt="College Logo"
            style={{ width: '40%', height: 'auto' }}
          />
          <br /><br />
          <p style={infoTextStyle}>Admin Contact:</p>
          <p>Email: smartexit@cbit.ac.in</p>
          <p>Phone No. : 123-456-7890 </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
