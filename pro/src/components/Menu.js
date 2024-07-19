import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaComments, FaQuestionCircle, FaUser, FaBox, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Menu = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const navStyle = {
    ...styles.nav,
    justifyContent: 'center',
  };

  // 로그아웃 후 홈으로 리디렉션하는 로직
  const handleLogoutAndRedirect = () => {
    handleLogout();  // 기존 로그아웃 로직 실행
    navigate('/');  // 홈 페이지로 리디렉션
  };

  // 버튼 클릭 시 역할 확인 및 리디렉션 로직
  const handleButtonClick = (e, path) => {
    const role = sessionStorage.getItem("role");
    console.log(role);
    if (role === "guest") {
      e.preventDefault();
      alert("정보를 입력해야 사용할 수 있습니다.");
      navigate("/signup-next");
    } else {
      navigate(path);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src="/logo1.png" alt="Logo" style={styles.logoImage} />
        LoGo
      </div>
      <nav style={styles.nav}>
        {isLoggedIn ? (
          <>
            <div style={styles.navCenter}>
              <Link to="" style={styles.navItem}>
                <FaHome style={styles.icon} /> Home
              </Link>
              <Link to="/chat_" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/chat_")}>
                <FaComments style={styles.icon} /> Chat
              </Link>
              <Link to="/QnA" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/QnA")}>
                <FaQuestionCircle style={styles.icon} /> QnA
              </Link>
              <Link to="/profile" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/profile")}>
                <FaUser style={styles.icon} /> My Page
              </Link>
              <Link to="/storage" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/storage")}>
                <FaBox style={styles.icon} /> Storage
              </Link>
            </div>
            <button className="out-btn" onClick={handleLogoutAndRedirect} style={styles.logoutButton}>
              <FaSignOutAlt style={styles.icon} /> 로그아웃
            </button>
          </>
        ) : (
          <div style={styles.authLinks}>
            <Link to="/login" style={styles.navItem}>
              <FaSignInAlt style={styles.icon} /> 로그인
            </Link>
            <Link to="/signup" style={styles.navItem}>
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
    width: '50px', // 로고 이미지의 너비를 적절히 조정
    height: 'auto', // 자동으로 높이를 조정하여 비율을 유지
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

// Google Fonts 링크 추가
const GoogleFontsLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet" />
);

export { GoogleFontsLink, Menu };
