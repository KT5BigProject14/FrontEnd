import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirect = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL 파라미터를 파싱하여 저장
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    const role = urlParams.get('role');

    console.log("Token:", token);
    console.log("Role:", role);
    console.log("type:", type);

    // token이 존재할 때만 상태 업데이트 및 리디렉션
    if (token && role && type) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('type', type);
      sessionStorage.setItem('role', role);
      setIsLoggedIn(true);
      navigate('/');
    }
  }, [navigate, setIsLoggedIn]);

  return null; // 아무것도 렌더링하지 않음
};

export default GoogleLoginRedirect;
