import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./PW_find.css";

const PWFind = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/retriever/users/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setIsCodeSent(true);
        setError("");
        alert("인증 코드가 이메일로 전송되었습니다.");
      } else {
        setError("이메일 전송에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/retriever/users/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (response.status === 200) {
        setIsCodeVerified(true);
        setError("");
        alert("인증 코드가 확인되었습니다.");
      } else {
        setError("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://localhost:8000/retriever/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/login");
      } else {
        setError("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="pw-find-container">
      <h1>비밀번호 찾기</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isCodeSent}
        />
        <button onClick={handleSendCode} disabled={isCodeSent}>
          인증번호 발송
        </button>
      </div>

      {isCodeSent && (
        <div>
          <label htmlFor="verificationCode">인증 코드</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isCodeVerified}
          />
          <button onClick={handleVerifyCode} disabled={isCodeVerified}>
            인증
          </button>
        </div>
      )}

      {isCodeVerified && (
        <div>
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>비밀번호 재설정</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PWFind;
