import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ onLogout }) => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>LOGO</div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navItem}>Home</Link>
        <Link to="/dashboard" style={styles.navItem}>Dashboard</Link>
        <Link to="/profile" style={styles.navItem}>My Page</Link>
        <Link to="/storage" style={styles.navItem}>Storage</Link>
      </nav>
      <button className="out-btn" onClick={onLogout} style={styles.logoutButton}>로그아웃</button>
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
    gap: '200px', // 여기서 각 항목 사이의 간격을 설정합니다.
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px', // 각 항목에 마진을 추가하여 간격을 설정합니다.
  },
  logoutButton: {
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Menu;
