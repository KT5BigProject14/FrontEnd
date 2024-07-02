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

  const hasValidEmail = () => {
    return !validateEmail(email) && email.length >=1
  }

  const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    // if(email.length >=1) {
    if (hasValidEmail()){
      setEmailError("유효한 이메일을 입력하세요.");
      setIsTempValid(false);
      // isTempValid = false;
    } else {
      setEmailError("");
    } 

    if (password.length < 8  && password.length >=1) {
      setPasswordError("비밀번호는 최소 8자리여야 합니다.");
      setIsTempValid(false);
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword && confirmPassword.length >=1) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      setIsTempValid(false);
    } else {
      setConfirmPasswordError("");
    }
    
  }, [email, password, confirmPassword])

  const handleSignup = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      username,
      password,
    };
    if (!isTempValid) {
    }
    if (isTempValid) {
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
