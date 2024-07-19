import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaComments, FaQuestionCircle, FaUser, FaBox, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Menu = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navStyle = {
    ...styles.nav,
    justifyContent: 'center',
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

  const handleButtonClick = (e, path) => {
    const role = sessionStorage.getItem("role");
    if (role === "guest") {
      e.preventDefault();
      alert("정보를 입력해야 사용할 수 있습니다.");
      navigate("/signup-next");
    } else {
      navigate(path);
    }
  };

  const getNavItemStyle = (path) => {
    return location.pathname === path ? styles.navItemActive : styles.navItem;
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/">
          <img src="/logo1.png" alt="Logo" style={styles.logoImage} />
        </Link>
        <Link to="/" style={styles.logoText}>LoGo</Link>
      </div>
      <nav style={styles.nav}>
        {isLoggedIn ? (
          <>
            <div style={styles.navCenter}>
              <Link to="/" style={getNavItemStyle("/")}>
                <FaHome style={styles.icon} /> Home
              </Link>
              <Link to="/chat_" style={getNavItemStyle("/chat_")} onClick={(e) => handleButtonClick(e, "/chat_")}>
                <FaComments style={styles.icon} /> Chat
              </Link>
              <Link to="/QnA" style={getNavItemStyle("/QnA")} onClick={(e) => handleButtonClick(e, "/QnA")}>
                <FaQuestionCircle style={styles.icon} /> QnA
              </Link>
              <Link to="/profile" style={getNavItemStyle("/profile")} onClick={(e) => handleButtonClick(e, "/profile")}>
                <FaUser style={styles.icon} /> My Page
              </Link>
              <Link to="/storage" style={getNavItemStyle("/storage")} onClick={(e) => handleButtonClick(e, "/storage")}>
                <FaBox style={styles.icon} /> Storage
              </Link>
            </div>
            <button className="out-btn" onClick={handleLogoutAndRedirect} style={styles.logoutButton}>
              <FaSignOutAlt style={styles.icon} /> 로그아웃
            </button>
          </>
        ) : (
          <div style={styles.authLinks}>
            <Link to="/login" style={getNavItemStyle("/login")}>
              <FaSignInAlt style={styles.icon} /> 로그인
            </Link>
            <Link to="/signup" style={getNavItemStyle("/signup")}>
              <FaUserPlus style={styles.icon} /> 회원가입
            </Link>
          </div>
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
    backgroundColor: 'white',
    padding: '10px 20px',
    color: '#333',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '50px',
    height: 'auto',
  },
  logoText: {
    color: '#333',
    textDecoration: 'none',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: '700',
    marginLeft: '10px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  navCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    gap: '30px',
  },
  navItem: {
    color: '#333',
    textDecoration: 'none',
    margin: '0 15px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: '700',
  },
  navItemActive: {
    color: '#333',
    textDecoration: 'none',
    margin: '0 15px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: '700',
    borderBottom: '2px solid #333',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: '700',
    marginLeft: 'auto',
  },
  icon: {
    marginRight: '8px',
  },
  authLinks: {
    display: 'flex',
    marginLeft: 'auto',
  },
};

const GoogleFontsLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet" />
);

export { GoogleFontsLink, Menu };
