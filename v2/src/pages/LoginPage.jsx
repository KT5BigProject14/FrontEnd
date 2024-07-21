import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/LoginPage.css';
import Header from '@/components/common/header';

const LoginPage = ({ setIsLoggedIn, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async event => {
    event.preventDefault();
    await new Promise(r => setTimeout(r, 1000));

    const response = await fetch(`${apiUrl}/retriever/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    if (response.status === 200) {
      setLoginCheck(false);
      sessionStorage.setItem('token', result.access_token);
      sessionStorage.setItem('type', result.type);
      if (result.role) {
        sessionStorage.setItem('role', result.role);
      }
      console.log('로그인성공, token:' + result.access_token);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setLoginCheck(true);
      setEmail('');
      setPassword('');
      const loginForm = document.querySelector('.login-form');
      loginForm.classList.add('shake');
      setTimeout(() => {
        loginForm.classList.remove('shake');
      }, 500);
      if (response.status === 400) {
        alert('이메일 혹은 비밀번호가 틀렸습니다.');
        console.log('data가 잘못들어감');
      } else if (response.status === 500) {
        alert('서버 문제로 인해 로그인에 실패했습니다.');
        console.log('서버문제');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const response = await fetch(`${apiUrl}/retriever/user/login/google`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    if (response.status === 200) {
      window.location.href = result.url;
    } else {
      alert('구글 로그인에 실패했습니다.');
    }
  };

  const handleNaverLogin = async () => {
    const response = await fetch(`${apiUrl}/retriever/user/login/naver`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    if (response.status === 200) {
      window.location.href = result.url;
    } else {
      alert('네이버 로그인에 실패했습니다.');
    }
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setLoginCheck(false); // 입력을 시작하면 에러 상태 초기화
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setLoginCheck(false); // 입력을 시작하면 에러 상태 초기화
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      <div className="login-container" onDragStart={e => e.preventDefault()}>
        <h1 className="login-title">Let's Start</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username">이메일</label>
          <input type="text" id="username" value={email} onChange={handleEmailChange} />
          <label htmlFor="password">비밀번호</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(prev => !prev)}
              className="password-toggle-icon"
            />
          </div>
          <div className="error-message-container">
            {loginCheck && <div className="error-message">올바른 이메일 혹은 비밀번호를 입력하세요.</div>}
          </div>
          <button type="submit">Login</button>
          <button type="button" className="naver-login-button" onClick={handleNaverLogin}>
            {/*<img src={`${process.env.PUBLIC_URL}/naver.png`} alt="Naver Logo" />*/}
            Login with Naver
          </button>
          <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
           {/*img src={`${process.env.PUBLIC_URL}/google.png`} alt="Google Logo" />*/}
            Login with Google
          </button>
          <p className="pw-find">
            비밀번호를 잊으셨나요? <Link to="/pw-find">PW찾기</Link>
          </p>
          <p className="signup-link">
            아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
