// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Universal Dashboard</h1>
        <p>Your all-in-one platform for managing companies and their modules.</p>
      </header>
      <div style={styles.buttonsContainer}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/signup" style={styles.button}>Sign Up</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f0f2f5',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    marginBottom: '30px',
  },
  buttonsContainer: {
    marginTop: '20px',
  },
  button: {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',  
    backgroundColor: '#007bff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  }
};

export default LandingPage;
