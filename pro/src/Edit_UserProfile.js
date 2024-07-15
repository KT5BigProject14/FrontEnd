import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Edit_UserProfile.css";

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
    const email = sessionStorage.getItem("email");
    if (token) {
      fetchUserInfo(token, email).then(data => {
        setUserInfo({
          email: data.email,
          user_name: data.user_name,
          corporation: data.corporation,
          business_number: data.business_number,
          position: data.position,
          phone: data.phone
        });
      });
    }
  }, []);

  const fetchUserInfo = async (token, email) => {
    try {
      const address = 'http://localhost:8000/retriever/user_info/user_info/' + email;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch('http://localhost:8000/retriever/user_info/user_info/', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
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
    <>
      <div className="navbar">
        <a href="/home">Home</a>
        <a href="/chat">Chat</a>
        <a href="/qna">QnA</a>
        <a href="/my-page">My Page</a>
        <a href="/storage">Storage</a>
        <a href="/logout">로그아웃</a>
      </div>
      <div className="edit-user-profile-container">
        <div className="edit-user-profile">
          <h2>Edit User Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email: {userInfo.email}</label>
            </div>
            <div>
              <label>Name: {userInfo.user_name}</label>
            </div>
            <div>
              <label>Corporation:</label>
              <input
                type="text"
                name="corporation"
                value={userInfo.corporation}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Business Number:</label>
              <input
                type="text"
                name="business_number"
                value={userInfo.business_number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={userInfo.position}
                onChange={handleInputChange}
              />
            </div>
            <div>
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
    </>
  );
};

export default EditUserProfile;