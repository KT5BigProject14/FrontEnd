import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../assets/user-icon.png';
import logoutIcon from '../assets/logout-icon.png';
import loginIcon from '../assets/login-icon.png';
import signupIcon from '../assets/signup-icon.png';
import './Menu.css';

const Menu = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

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
      <div style={styles.logo}>LOGO</div>
      <nav style={styles.nav}>
        <div style={styles.centerItems}>
          {isLoggedIn && (
            <>
              <Link to="/" className="nav-item">Home</Link>
              <Link to="/chat_" className="nav-item" onClick={(e) => handleButtonClick(e, "/chat_")}>Chat</Link>
              <Link to="/QnA" className="nav-item" onClick={(e) => handleButtonClick(e, "/QnA")}>QnA</Link>
              <Link to="/storage" className="nav-item" onClick={(e) => handleButtonClick(e, "/storage")}>Storage</Link>
            </>
          )}
        </div>
        <div style={styles.rightItems}>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-item" onClick={(e) => handleButtonClick(e, "/profile")}>
                <img src={userIcon} alt="User Icon" style={styles.icon} /> My Page
              </Link>
              <button className="logout-button" onClick={handleLogoutAndRedirect}>
                <img src={logoutIcon} alt="Logout Icon" style={styles.icon} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                <img src={loginIcon} alt="Login Icon" style={styles.icon} /> 로그인
              </Link>
              <Link to="/signup" className="nav-item">
                <img src={signupIcon} alt="Signup Icon" style={styles.icon} /> 회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#E5F1FF',
    padding: '15px',
    color: '#06438B',
    height: '70px',
  },
  logo: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    width: '45%', // 아이템들이 펼쳐질 공간의 너비 설정
    marginLeft: '35%', // 시작 위치를 전체 길이의 35%로 설정
    gap: '40px', // 간격 조절
  },
  rightItems: {
    display: 'flex',
    alignItems: 'center',
    width: '20%', // 오른쪽 아이템들이 펼쳐질 공간의 너비 설정
    justifyContent: 'flex-end', // 오른쪽 아이템들이 오른쪽 정렬되도록 설정
  },
  icon: {
    marginRight: '5px',
    width: '20px',
    height: '20px',
  },
};

export default Menu;
