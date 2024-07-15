// UserProfile.js
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = ({ handleLogout }) => {
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
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem("email");
    if (email) {
      // 토큰을 사용하여 서버에서 사용자 정보를 가져오는 함수 호출
      fetchUserInfo(email).then(data => {
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

  const fetchUserInfo = async (email) => {
    try {
      const token=sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");
      console.log()
      const address = 'http://localhost:8000/retriever/user_info/user_info/'+email
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

  const formatBusinessNumber = (number) => {
    const numStr = String(number);  // number를 문자열로 변환
    return `${numStr.slice(0, 3)}-${numStr.slice(3, 5)}-${numStr.slice(5)}`;
  };

  const formatPhoneNumber = (number) => {
    const numStr = String(number);  // number를 문자열로 변환
    return `${numStr.slice(0, 3)}-${numStr.slice(3, 7)}-${numStr.slice(7)}`;
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="user-profile">
      <h2>MY Infomation</h2>
      <div className="user-info">
        <p>Email: {userInfo.email}</p>
        <p>Name: {userInfo.user_name}</p>
        <p>Corporation: {userInfo.corporation}</p>
        <p>Business Number: {userInfo.business_number}</p>
        <p>Position: {userInfo.position}</p>
        <p>Phone: {userInfo.phone}</p>
      </div>
      <div className="user-actions">
        <button className="user-edit-btn" onClick={handleEditProfile}>
          내 정보 수정하기
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
