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
import Storage from './Storage';
import Dashboard from './Dashborad';
import NewPost from './NewPost';
import ViewPost from './ViewPost';
import EditPost from './EditPost';
import ChangePassword from './ChagePassword';

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
    sessionStorage.removeItem('role');
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
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditUserProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/HeroComponent" element={<HeroComponent />} />
        <Route path="/Chat_" element={<Chat />} />
        <Route path="/test" element={<TextRevealCardPreview />} />
        <Route path="/pw-find" element={<PWFind />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/QnA" element={<Dashboard />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/qna/:qna_id" element={<ViewPost />} />
        <Route path="/edit-post/:qna_id" element={<EditPost />} /> 

      </Routes>
    </Router>
  );
}

export default App;
