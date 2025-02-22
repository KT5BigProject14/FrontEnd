import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import apiFetch from "../api";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UserPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    user_name: "",
    corporation: "",
    business_number: "",
    position: "",
    phone: "",
    keyword: ""
  });
  const [isPasswordChangeDisabled, setIsPasswordChangeDisabled] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('type');
    
    if (userType === 'social') {
      setIsPasswordChangeDisabled(true);
    }

    if (token) {
      // 토큰을 사용하여 서버에서 사용자 정보를 가져오는 함수 호출
      fetchUserInfo(token).then(data => {
        if(data.user_keyword){
        setUserInfo({
          email: data.user_info.email,
          user_name: data.user_info.user_name,
          corporation: data.user_info.corporation,
          business_number: formatBusinessNumber(data.user_info.business_number),
          position: data.user_info.position,
          phone: formatPhoneNumber(data.user_info.phone),
          keyword: formatKeywords(data.user_keyword) // keyword를 포맷팅하여 설정
        });
      }else{
        setUserInfo({
          email: data.user_info.email,
          user_name: data.user_info.user_name,
          corporation: data.user_info.corporation,
          business_number: formatBusinessNumber(data.user_info.business_number),
          position: data.user_info.position,
          phone: formatPhoneNumber(data.user_info.phone),
        }); 
      }
      });
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const address = `${apiUrl}/retriever/info/user`;
      const response = await apiFetch(address, {
        method: 'GET',
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return {
        email: "",
        user_name: "",
        corporation: "",
        business_number: "",
        position: "",
        phone: "",
        keyword: ""
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

  const formatKeywords = (keywords) => {
    // likeyear, likecountry, likebusiness를 각각 #을 붙여 포맷팅
    const formattedKeywords = [];
    if (keywords.likeyear) formattedKeywords.push(`#${keywords.likeyear}`);
    if (keywords.likecountry) formattedKeywords.push(`#${keywords.likecountry}`);
    if (keywords.likebusiness) formattedKeywords.push(`#${keywords.likebusiness}`);
    return formattedKeywords.join(' ');
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleChangePassword = () => {
    if (!isPasswordChangeDisabled) {
      navigate("/change-password");
    }
  };

  const handleLikekeyword =() =>{
    navigate("/like-keyword");
  }

  return (
    <div className="user-profile">
      <h2>MY Information</h2>
      <div className="user-info">
        <p><span className="label">Email:</span> <span className="value">{userInfo.email}</span></p>
        <p><span className="label">Name:</span> <span className="value">{userInfo.user_name}</span></p>
        <p><span className="label">Corporation:</span> <span className="value">{userInfo.corporation}</span></p>
        <p><span className="label">Business Number:</span> <span className="value">{userInfo.business_number}</span></p>
        <p><span className="label">Position:</span> <span className="value">{userInfo.position}</span></p>
        <p><span className="label">Phone:</span> <span className="value">{userInfo.phone}</span></p>
        <p><span className="label">Keyword:</span> <span className="value">{userInfo.keyword}</span></p>
      </div>
      <div className="user-actions">
        <button className="user-edit-btn" onClick={handleEditProfile}>
          내 정보 수정하기
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
        <button className="user-edit-btn" onClick={handleLikekeyword}>
          관심단어 지정하기
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
        <button 
          className="user-edit-btn" 
          onClick={handleChangePassword} 
          disabled={isPasswordChangeDisabled}
          style={{ backgroundColor: isPasswordChangeDisabled ? '#f0f0f0' : 'white', color: isPasswordChangeDisabled ? '#808080' : 'black' }}
        >
          비밀번호 변경하기
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserPage;
