import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';
import apiFetch from './api';
const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('새 비밀번호와 일치하지 않습니다.');
      return;
    }
    if (!validatePassword(newPassword)) {
      setError('비밀번호는 영문, 숫자, 특수기호를 조합하여 8자 이상 입력해 주세요.');
      return;
    }

    const token = sessionStorage.getItem('token');
    const requestData = {
      password: currentPassword,
      new_password: newPassword
    };

    try {
      const response = await apiFetch('http://localhost:8000/retriever/info/change/password', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
        // },
        body: JSON.stringify(requestData)
      });

      if (!response.status === 200) {
        throw new Error('Network response was not ok');
      }

      navigate('/profile'); // 비밀번호 변경 후 프로필 페이지로 이동
    } catch (error) {
      setError('기존 비밀번호와 일치하지 않거나 비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="change-password">
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>기존 비밀번호</label>
          <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} required />
        </div>
        <div>
          <label>새 비밀번호</label>
          <input type="password" value={newPassword} onChange={handleNewPasswordChange} required />
        </div>
        <div>
          <label>새 비밀번호 확인</label>
          <input type="password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default ChangePassword;
