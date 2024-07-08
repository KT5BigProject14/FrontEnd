// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ isLoggedIn, handleLogout }) => {
  const navStyle = {
    ...styles.nav,
    gap: isLoggedIn ? '200px' : '100px',
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>LOGO</div>
      <nav style={navStyle}>
        {isLoggedIn ? (
          <>
            <Link to="/" style={styles.navItem}>Home</Link>
            <Link to="/dashboard" style={styles.navItem}>Dashboard</Link>
            <Link to="/profile" style={styles.navItem}>My Page</Link>
            <Link to="/storage" style={styles.navItem}>Storage</Link>
            <button className="out-btn" onClick={handleLogout} style={styles.logoutButton}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navItem}>로그인</Link>
            <Link to="/signup" style={styles.navItem}>회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#282c34',
    padding: '10px',
    color: 'white',
  },
  logo: {
    fontSize: '24px',
  },
  nav: {
    display: 'flex',
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px', // 각 항목에 마진 추가하여 간격 설정
  },
  logoutButton: {
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Menu;
