import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/InputInfoPage.css";
import apiFetch from "../api";

const InputInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [position, setPosition] = useState("");
  const [extensionNumber, setExtensionNumber] = useState("");

  const [error, setError] = useState("");

  const formData = location.state || {};
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInfo = async (event) => {
    event.preventDefault();
  
    // Validation logic
    if (!username || !companyName || !businessNumber || !position || !extensionNumber) {
      setError("모든 필드를 입력해 주세요.");
      return;
    }
  
    if (businessNumber.replace(/\D/g, '').length !== 10 || extensionNumber.replace(/\D/g, '').length !== 11) {
      setError("형식에 맞는 값을 다시 작성해주세요.");
      return;
    }
  
    const cleanedBusinessNumber = parseInt(businessNumber.replace(/-/g, ''), 10);
    const cleanedExtensionNumber = extensionNumber.replace(/-/g, '');
    const token = sessionStorage.getItem('token');
  
    const payload = {
      corporation: companyName,
      business_number: cleanedBusinessNumber,
      position,
      phone: cleanedExtensionNumber,
      user_name: username,
    };

    try {
      const response = await apiFetch(`${apiUrl}/retriever/info/create/user`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   'Authorization': `Bearer ${token}`
        // },
        body: JSON.stringify(payload),
      });

      const data=response.data;

      if (response.status === 200) {
        console.log("성공! 정보기입");
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("role", data.role);
        navigate("/");
      }else {
        setError(response.data.detail || "Unknown error occurred");
      }
    } catch (error) {
      setError(error.message);
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

    const formatExtensionNumber = (number) => {
      const cleaned = ('' + number).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);
      if (match) {
        return [match[1], match[2], match[3]].filter(x => x).join('-');
      }
      return number;
    };

    setBusinessNumber((prev) => formatBusinessNumber(prev));
    setExtensionNumber((prev) => formatExtensionNumber(prev));
  }, [businessNumber, extensionNumber]);

  const handleBusinessNumberChange = (e) => {
    setError(""); // Clear error on input change
    const { value } = e.target;
    if (value.replace(/\D/g, '').length <= 10) {
      setBusinessNumber(value);
    }
  };

  const handleExtensionNumberChange = (e) => {
    setError(""); // Clear error on input change
    const { value } = e.target;
    if (value.replace(/\D/g, '').length <= 11) {
      setExtensionNumber(value);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setError(""); // Clear error on input change
    setter(e.target.value);
  };

  return (
    <div className="inputinfo-container">
      <h1 className="inputinfo-title">More Information</h1>
      <form className="inputinfo-form" onSubmit={handleInfo}>
        <label htmlFor="companyName">회사명</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={handleInputChange(setCompanyName)}
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
          onChange={handleInputChange(setUsername)}
        />

        <label htmlFor="position">직책</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={handleInputChange(setPosition)}
        />

        <label htmlFor="extensionNumber">전화번호</label>
        <input
          type="text"
          id="extensionNumber"
          value={extensionNumber}
          onChange={handleExtensionNumberChange}
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default InputInfoPage;
