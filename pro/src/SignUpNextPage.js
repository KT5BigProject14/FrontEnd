// SignupNext.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignupNext = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [position, setPosition] = useState("");
  const [extensionNumber, setExtensionNumber] = useState("");

  const formData = location.state || {};

  const handleSignup = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      companyName,
      businessNumber,
      position,
      extensionNumber,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log("성공! 이메일주소: " + data.email);
        navigate("/login");
      } else if (response.status === 400) {
        alert(`회원가입 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>More Infomation</h1>
        <label htmlFor="companyName">회사명</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label htmlFor="businessNumber">사업자 번호</label>
        <input
          type="text"
          id="businessNumber"
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value)}
        />
        <label htmlFor="position">직책</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <label htmlFor="extensionNumber">내선 번호</label>
        <input
          type="text"
          id="extensionNumber"
          value={extensionNumber}
          onChange={(e) => setExtensionNumber(e.target.value)}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupNext;
