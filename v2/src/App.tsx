import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
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
      <Routes>
        <Route
          path="/"
          element={<HomePage isLoggedIn={isLoggedIn} hasToken={hasToken} handleLogout={handleLogout} />}
        />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
