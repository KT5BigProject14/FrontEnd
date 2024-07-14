import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignupNext = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [position, setPosition] = useState("");
  const [extensionNumber, setExtensionNumber] = useState("");

  const formData = location.state || {};

  const handleInfo = async (event) => {
    event.preventDefault();

    // Remove hyphens from businessNumber and convert to number
    const cleanedBusinessNumber = parseInt(businessNumber.replace(/-/g, ''), 10);

    const payload = {
      user_name:username,
      corporation: companyName,
      business_number: cleanedBusinessNumber,
      position,
      phone: extensionNumber,
    };

    try {
      const response = await fetch("http://localhost:8000/retriever/user_info/user_info/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("성공! 정보기입" );
        navigate("/");
      } else if (response.status === 400) {
        alert(`회원가입 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    const formatBusinessNumber = (number) => {
      const cleaned = ('' + number).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,5})$/);
      if (match) {
        return [match[1], match[2], match[3]].filter(x => x).join('-');
      }
      return number;
    };

    setBusinessNumber((prev) => formatBusinessNumber(prev));
  }, [businessNumber]);

  const handleBusinessNumberChange = (e) => {
    const { value } = e.target;
    // Allow input only if the length is less than or equal to 12 characters (including hyphens)
    if (value.replace(/\D/g, '').length <= 10) {
      setBusinessNumber(value);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleInfo}>
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
          onChange={handleBusinessNumberChange}
        />
        <label htmlFor="username">이름</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="position">직책</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <label htmlFor="extensionNumber">전화번호</label>
        <input
          type="text"
          id="extensionNumber"
          value={extensionNumber}
          onChange={(e) => setExtensionNumber(e.target.value)}
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default SignupNext;