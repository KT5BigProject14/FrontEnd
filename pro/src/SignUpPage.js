import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isTempValid, setIsTempValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = () => {
    return password === confirmPassword
  }

  const validateusername = () => {
    if (username.length >=1){
      return true
    } else return false
  }

  useEffect(() => {
    
    if (validateEmail(email)){
      setEmailError("");
    } else {
        if (email.length >=1) {
          setEmailError("유효한 이메일을 입력하세요.");
        }
        else{
          setEmailError("");
        }
    }

    if (validatePassword(password)){
      setPasswordError("");
    } else {
        if (password.length >=1) {
          setPasswordError("비밀번호는 영문, 숫자, 특수기호를 조합하여 8자 이상 입력해 주세요.");
        }
        else{
          setPasswordError("");
        }
    }

    if (validateConfirmPassword()){
      setConfirmPasswordError("");
    } else {
        if (confirmPassword.length >=1) {
          setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        }
        else{
          setConfirmPasswordError("");
        }
    }

  }, [email, password, confirmPassword])

  const handleSignup = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
      username
    };

    if (validateEmail(email) && validateusername() &&validatePassword(password) && validateConfirmPassword()) {
      navigate("/signup-next", { state: formData });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <label htmlFor="username">이름</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        <button type="submit">Next Page</button>
        <p className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
