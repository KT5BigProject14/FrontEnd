import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Edit_UserProfile.css";

const EditUserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    user_name: "",
    corporation: "",
    business_number: "",
    position: "",
    phone: ""
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserInfo(token).then(data => {
        setUserInfo({
          email: data.email,
          user_name: data.user_name,
          corporation: data.corporation,
          business_number: formatBusinessNumber(data.business_number),
          position: data.position,
          phone: formatPhoneNumber(data.phone)
        });
      });
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const address = 'http://localhost:8000/retriever/info/user';
      const response = await fetch(address, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    const formattedUserInfo = {
      ...userInfo,
      business_number: userInfo.business_number.replace(/-/g, ''),
      phone: userInfo.phone.replace(/-/g, '')
    };

    try {
      const response = await fetch('http://localhost:8000/retriever/info/change/user', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedUserInfo)
      });

      if (!response.ok) {
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
              <span className="no-underline">{userInfo.email}</span> {/* no-underline 클래스 추가 */}
            </div>
            <div className="info-group">
              <label>Name:</label>
              <span className="no-underline">{userInfo.user_name}</span> {/* no-underline 클래스 추가 */}
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
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
