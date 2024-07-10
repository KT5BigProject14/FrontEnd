// Menu.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate 추가

const Menu = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();  // useNavigate 훅 사용

  const navStyle = {
    ...styles.nav,
    gap: isLoggedIn ? '200px' : '100px',
  };

  // 로그아웃 후 홈으로 리디렉션하는 로직
  const handleLogoutAndRedirect = () => {
    handleLogout();  // 기존 로그아웃 로직 실행
    navigate('/');  // 홈 페이지로 리디렉션
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
            <button className="out-btn" onClick={handleLogoutAndRedirect} style={styles.logoutButton}>로그아웃</button>
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
    margin: '0 15px',
  },
  logoutButton: {
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Menu;
