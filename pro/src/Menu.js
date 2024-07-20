import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaComments, FaQuestionCircle, FaUser, FaBox, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './styles/Menu.css'; // CSS 파일을 분리하여 import

const Menu = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

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
    <header className="header">
      <div className="logo">
        <img src="./main_logo.png" alt="Logo" className="logoImage" />
        {/* LoGo */}
      </div>
      <nav className="nav">
        {isLoggedIn ? (
          <>
            <div className="navCenter">
              <Link to="" className="navItem">
                <FaHome className="icon" /> Home
              </Link>
              <Link to="/chat_" className="navItem" onClick={(e) => handleButtonClick(e, "/chat_")}>
                <FaComments className="icon" /> Chat
              </Link>
              <Link to="/QnA" className="navItem" onClick={(e) => handleButtonClick(e, "/QnA")}>
                <FaQuestionCircle className="icon" /> QnA
              </Link>
              <Link to="/profile" className="navItem" onClick={(e) => handleButtonClick(e, "/profile")}>
                <FaUser className="icon" /> My Page
              </Link>
              <Link to="/storage" className="navItem" onClick={(e) => handleButtonClick(e, "/storage")}>
                <FaBox className="icon" /> Storage
              </Link>
            </div>
            <button className="logoutButton" onClick={handleLogoutAndRedirect}>
              <FaSignOutAlt className="icon" /> 로그아웃
            </button>
          </>
        ) : (
          <div className="authLinks">
            <Link to="/login" className="navItem">
              <FaSignInAlt className="icon" /> 로그인
            </Link>
            <Link to="/signup" className="navItem">
              <FaUserPlus className="icon" /> 회원가입
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

// Google Fonts 링크 추가
const GoogleFontsLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet" />
);

export { GoogleFontsLink, Menu };