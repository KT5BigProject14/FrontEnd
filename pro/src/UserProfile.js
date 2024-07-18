import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import apiFetch from "./api";

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
    if (token) {
      // 토큰을 사용하여 서버에서 사용자 정보를 가져오는 함수 호출
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
      const response = await apiFetch(address, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.status ===200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data
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

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className="user-profile">
      <h2>MY Information</h2>
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
        <button className="user-edit-btn" onClick={handleChangePassword}>
          비밀번호 변경하기
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
