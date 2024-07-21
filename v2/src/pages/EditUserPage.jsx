import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../api";
import "../styles/Edit_UserProfile.css";

const EditUserPage = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [userInfo, setUserInfo] = useState({
    email: "",
    user_name: "",
    corporation: "",
    business_number: "",
    position: "",
    phone: ""
  });
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserInfo(token).then(data => {
        const formattedData = {
          email: data.email,
          user_name: data.user_name,
          corporation: data.corporation,
          business_number: formatBusinessNumber(data.business_number),
          position: data.position,
          phone: formatPhoneNumber(data.phone)
        };
        setUserInfo(formattedData);
        setOriginalUserInfo(formattedData);
      });
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const address = '${apiUrl}/retriever/info/user';
      const response = await apiFetch(address, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error:', error);
      return {
        email: "",
        user_name: "",
        corporation: "",
        business_number: "",
        position: "",
        phone: ""
      };
    }
  };

  const formatBusinessNumber = (value) => {
    const rawValue = String(value).replace(/[^0-9]/g, '');
    if (rawValue.length <= 3) return rawValue;
    if (rawValue.length <= 5) return `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    return `${rawValue.slice(0, 3)}-${rawValue.slice(3, 5)}-${rawValue.slice(5, 10)}`;
  };

  const formatPhoneNumber = (value) => {
    const rawValue = String(value).replace(/[^0-9]/g, '');
    if (rawValue.length <= 3) return rawValue;
    if (rawValue.length <= 7) return `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    return `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "business_number") {
      formattedValue = formatBusinessNumber(value);
    } else if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    }

    setUserInfo({ ...userInfo, [name]: formattedValue });
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    let hasError = false;
    let errorMessages = [];

    if (userInfo.business_number.replace(/-/g, '').length !== 10) {
      errorMessages.push("올바른 사업자 번호를 입력하세요");
      setUserInfo(prevState => ({
        ...prevState,
        business_number: originalUserInfo.business_number
      }));
      hasError = true;
    }

    if (userInfo.phone.replace(/-/g, '').length !== 11) {
      errorMessages.push("올바른 전화번호를 입력하세요");
      setUserInfo(prevState => ({
        ...prevState,
        phone: originalUserInfo.phone
      }));
      hasError = true;
    }

    if (hasError) {
      setErrorMessage(errorMessages.join(", "));
      return;
    }

    const formattedUserInfo = {
      ...userInfo,
      business_number: userInfo.business_number.replace(/-/g, ''),
      phone: userInfo.phone.replace(/-/g, '')
    };

    try {
      const response = await apiFetch('${apiUrl}/retriever/info/change/user', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedUserInfo)
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      // Navigate back to user profile or show success message
      navigate("/profile");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="edit-user-profile-container">
        <h2>Edit User Profile</h2>
        <div className="edit-user-profile">
          <form onSubmit={handleSubmit}>
            <div className="info-group">
              <label>Email:</label>
              <span className="no-underline">{userInfo.email}</span>
            </div>
            <div className="info-group">
              <label>Name:</label>
              <span className="no-underline">{userInfo.user_name}</span>
            </div>
            <div className="info-group">
              <label>Corporation:</label>
              <input
                type="text"
                name="corporation"
                value={userInfo.corporation}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-group">
              <label>Business Number:</label>
              <input
                type="text"
                name="business_number"
                value={userInfo.business_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-group">
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={userInfo.position}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="error-message-container">
              <p className="error-message">{errorMessage}</p>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
