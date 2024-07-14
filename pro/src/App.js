import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LoginPage';
import Signup from './SignUpPage';
import UserProfile from './UserProfile';
import EditUserProfile from './Edit_UserProfile';
import SignupNext from './SignUpNextPage';
import HeroComponent from './HeroComponent';
import Chat from './Chat_';
import TextRevealCardPreview from './test';
import PWFind from './PW_find';
import Menu from './Menu';
import Stroage from './Stroage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
    setHasToken(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 1000); // Check login status every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    setIsLoggedIn(false);
    setHasToken(false); // 로그아웃 시 hasToken 상태 업데이트
  };

  return (
    <Router>
      <Menu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route 
          path="/" 
          element={<HeroComponent isLoggedIn={isLoggedIn} hasToken={hasToken} handleLogout={handleLogout} />} 
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-next" element={<SignupNext />} />
        <Route path="/profile" element={<UserProfile handleLogout={handleLogout} />} />
        <Route path="/edit-profile" element={<EditUserProfile handleLogout={handleLogout} />} />
        <Route path="/HeroComponent" element={<HeroComponent />} />
        <Route path="/Chat_" element={<Chat />} />
        <Route path="/test" element={<TextRevealCardPreview />} />
        <Route path="/pw-find" element={<PWFind />} />
        <Route path="/stroage" element={<Stroage />} />

      </Routes>
    </Router>
  );
}

export default App;
