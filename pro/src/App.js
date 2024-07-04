// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LoginPage';
import Signup from './SignUpPage';
import UserProfile from './UserProfile';
// import Home from './HomePage';
import SignupNext from "./SignUpNextPage";
import HeroComponent from './HeroComponent';
import Chat from './Chat_';
import TextRevealCardPreview from './Aceternity_UI/TextRevealCard';
import GlobeDemo from './Aceternity_UI/backgroundGlobe';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('storeid');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroComponent isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-next" element={<SignupNext />} />
        <Route path="/profile" element={<UserProfile handleLogout={handleLogout} />} />
        <Route path="/HeroComponent" element={<HeroComponent />} />
        <Route path="/Chat_" element={<Chat />} />
        <Route path="/test1" element={<TextRevealCardPreview />} />
        {/* <Route path="/test2" element={<GlobeDemo />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
