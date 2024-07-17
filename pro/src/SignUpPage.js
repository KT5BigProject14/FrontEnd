import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/SignUpPage.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/retriever/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("성공! 이메일주소: " + data.email);
        navigate("/login");
      } else if (response.status === 400) {
        alert(`회원가입 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = () => {
    return password === confirmPassword;
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError("");
    } else {
      if (email.length >= 1) {
        setEmailError("유효한 이메일을 입력하세요.");
      } else {
        setEmailError("");
      }
    }

    if (validatePassword(password)) {
      setPasswordError("");
    } else {
      if (password.length >= 1) {
        setPasswordError("비밀번호는 영문, 숫자, 특수기호를 조합하여 8자 이상 입력해 주세요.");
      } else {
        setPasswordError("");
      }
    }

    if (validateConfirmPassword()) {
      setConfirmPasswordError("");
    } else {
      if (confirmPassword.length >= 1) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [email, password, confirmPassword]);

  const sendVerificationCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/retriever/email/send_by_gmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsCodeSent(true);
        alert("인증코드가 발송되었습니다.");
      } else {
        alert("인증코드 발송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("서버 오류로 인해 인증코드 발송에 실패했습니다.");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/retriever/email/check_code", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verify_code: code }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setIsCodeVerified(true);
        alert("인증이 성공하였습니다.");
      } else {
        setIsCodeVerified(false);
        alert("인증코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("서버 오류로 인해 인증에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <label htmlFor="email">이메일</label>
        <div className="email-container">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={sendVerificationCode} disabled={isCodeSent}>
            인증코드 발송
          </button>
        </div>
        {emailError && <p className="error-message">{emailError}</p>}
        <label htmlFor="code">인증번호</label>
        <div className="code-container">
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="button" onClick={verifyCode}>
            인증
          </button>
        </div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isCodeVerified}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={!isCodeVerified}
        />
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        <button type="submit" disabled={!isCodeVerified}>
          회원가입
        </button>
        <p className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
