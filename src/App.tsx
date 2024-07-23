import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GoogleLoginRedirect from "./pages/GoogleLoginRedirect";
import NaverLoginRedirect from "./pages/NaverLoginRedirect";
import SignPage from './pages/SignPage';
import PWFindPage from './pages/PWFindPage';
import InputInfoPage from './pages/InputInfoPage';
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage';
import LikePage from './pages/LikePage';
import PWChangePage from './pages/PWChangePage';
import QnaPage from './pages/QnaPage';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import ViewPost from './pages/ViewPost';
import Chat from './pages/Chat_';
import Storage from './pages/Storage';
import Community from './pages/Commuinty';


import { useEffect, useState } from 'react';

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

  const handleLogout = async () => {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/retriever/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await response.json();
    if (response.status === 200) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');
      setIsLoggedIn(false);
      setHasToken(false); // 로그아웃 시 hasToken 상태 업데이트
    } else {
      console.log('리프레쉬 토큰 삭제 실패');
    }
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} hasToken={hasToken} handleLogout={handleLogout} />}/>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/google/login" element={<GoogleLoginRedirect setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/naver/login" element={<NaverLoginRedirect setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/pw-find" element={<PWFindPage />} />
        <Route path="/info" element={<InputInfoPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/edit-profile" element={<EditUserPage />} />
        <Route path="/like-keyword" element={<LikePage />} />
        <Route path="/change-password" element={<PWChangePage />} />
        <Route path="/QnA" element={<QnaPage />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/qna/:qna_id" element={<ViewPost />} />
        <Route path="/edit-post/:qna_id" element={<EditPost />} /> 
        <Route path="/chat_" element={<Chat />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/Community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
