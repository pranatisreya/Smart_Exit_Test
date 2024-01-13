// student/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const styles = {
    nav: {
      backgroundColor: '#fff', // Background color
      padding: '10px', // Padding
      display: 'flex', // Use flex layout
      justifyContent: 'space-between', // Space between logo and links
      alignItems: 'center', // Center items vertically
    },
    logo: {
      width: '50px', // Set the width of the logo
      height: 'auto', // Maintain aspect ratio
      marginRight: '10px', // Add some margin after the logo
    },
    ul: {
      listStyleType: 'none', // Remove list styling
      display: 'flex', // Use flex layout
      justifyContent: 'center', // Center the items horizontally
      margin: '0', // Remove default margin
      padding: '0', // Remove default padding
    },
    li: {
      margin: '0 10px', // Add spacing between list items
    },
    link: {
      textDecoration: 'none', // Remove underlines from links
      color: 'black', // Text color
      fontSize: '18px', // Font size
      fontWeight: 'bold', // Font weight
    },
  };

  return (
    <nav style={styles.nav}>
      <img src="./public/cbit_logo_small.png" alt="Logo" style={styles.logo} />
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/StudentPage" style={styles.link}>Logout</Link></li>
        {/* <li style={styles.li}><Link to="/StudentPassForm" style={styles.link}>GatePass Form</Link></li>
        <li style={styles.li}><Link to="/StudentDisplayPass" style={styles.link}>GatePass List</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
