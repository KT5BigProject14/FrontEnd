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
    const token = sessionStorage.getItem("token");
    if (token) {
      // 토큰을 사용하여 서버에서 사용자 정보를 가져오는 함수 호출
      fetchUserInfo(token).then(data => {
        setUserInfo({
          email: data.email,
          user_name: data.user_name,
          corporation: data.corporation,
          business_number: formatBusinessNumber(data.business_number),
          position: data.position,
          phone: data.phone
        });
      });
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://api.example.com/data', {
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
    return `${number.slice(0, 3)}-${number.slice(3, 5)}-${number.slice(5)}`;
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <p>이메일: {userInfo.email}</p>
        <p>이름: {userInfo.user_name}</p>
        <p>회사: {userInfo.corporation}</p>
        <p>사업자번호: {userInfo.business_number}</p>
        <p>직책: {userInfo.position}</p>
        <p>전화번호: {userInfo.phone}</p>
      </div>
      <div className="user-actions">
        <button className="user-edit-btn" onClick={handleEditProfile}>
          내 정보 수정하기
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
        <button className="user-logout-btn" onClick={handleLogoutClick}>
          로그아웃
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
