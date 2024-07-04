// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

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
      console.log("로그인성공, token:" + result.access_token);
      setIsLoggedIn(true);
      navigate("/");
    } else if(response.status === 400) {
      setLoginCheck(false);
      console.log('data가 잘못들어감')
    } else if(response.status === 500) {
      setLoginCheck(true);
      console.log('서버문제')
    } 
  };
// 400 : data가 잘 못들어감
// 500 : 서버문제
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
          <label style={{ color: "red" }}>이메일 혹은 비밀번호가 틀렸습니다.</label>
        )}
        <button type="submit">로그인</button>
        <p className="signup-link">
          아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
