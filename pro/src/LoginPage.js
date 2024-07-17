import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch("http://localhost:8000/retriever/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    if (response.status === 200) {
      setLoginCheck(false);
      sessionStorage.setItem("token", result.access_token);
      sessionStorage.setItem("email", result.email);
      if (result.role) {
        sessionStorage.setItem("role", result.role);
      }
      console.log("로그인성공, token:" + result.access_token);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setLoginCheck(true);
      if (response.status === 400) {
        alert("이메일 혹은 비밀번호가 틀렸습니다.");
        console.log('data가 잘못들어감');
      } else if (response.status === 500) {
        alert("서버 문제로 인해 로그인에 실패했습니다.");
        console.log('서버문제');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const response = await fetch("http://localhost:8000/retriever/login/google", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (response.status === 200) {
      window.location.href = result.url;
    } else {
      alert("구글 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Let's start</h1>
        <label htmlFor="username">이메일</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginCheck && (
          <label style={{ color: "red" }}>올바른 이메일 혹은 비밀번호를 입력하세요.</label>
        )}
        <button type="submit">로그인</button>
        <button type="button" onClick={handleGoogleLogin}>구글 로그인</button>
        <p className="pw-find">
          비밀번호를 잊으셨나요? <Link to="/pw-find">PW찾기</Link>
        </p>
        <p className="signup-link">
          아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
