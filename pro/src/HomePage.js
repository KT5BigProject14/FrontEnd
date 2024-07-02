// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn, handleLogout }) => {
  return (
    <div className="home-container">
      <h1>메인 화면</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <Link to="/signup">
            <button>회원가입</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
