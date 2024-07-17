import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
  }, [email]);

  const sendVerificationCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/retriever/user/find/password/send/email/code", {
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
      const response = await fetch("http://localhost:8000/retriever/user/check/code", {
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
        setCodeError("");
      } else {
        setIsCodeVerified(false);
        setCodeError("인증코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("서버 오류로 인해 인증에 실패했습니다.");
    }
  };

  const handleGetNewPassword = async () => {
    try {
      const response = await fetch("http://localhost:8000/retriever/user/send/new/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert(`새 비밀번호가 이메일로 발송되었습니다: ${data.message}`);
        navigate("/login");
      } else {
        alert(`비밀번호 발송 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("서버 오류로 인해 비밀번호 발송에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <h1>비밀번호 찾기</h1>
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
        {codeError && <p className="error-message">{codeError}</p>}
        <button type="button" onClick={handleGetNewPassword} disabled={!isCodeVerified}>
          새 비밀번호 받기
        </button>
        <p className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
