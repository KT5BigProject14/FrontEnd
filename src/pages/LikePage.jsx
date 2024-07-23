import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LikePage.css';
import apiFetch from '../api';

const LikePage = () => {
  const navigate = useNavigate();
  const [Likeyear, setLikeyear] = useState('');
  const [Likecountry, setLikecountry] = useState('');
  const [Likebusiness, setLikebusiness] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLikeyear = (e) => {
    setLikeyear(e.target.value);
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleLikecountry = (e) => {
    setLikecountry(e.target.value);
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleLikebusiness = (e) => {
    setLikebusiness(e.target.value);
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    const requestData = {
        likeyear: Likeyear,
        likecountry: Likecountry,
        likebusiness:Likebusiness,
    };
    navigate('/profile');
    try {
      const response = await apiFetch(`${apiUrl}/retriever/info/keyword`, {
        method: 'POST',
        body: JSON.stringify(requestData)
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      navigate('/profile'); // 지정 후 프로필 페이지로 이동
    } catch (error) {
      setError('지정 중 오류가 발생했습니다.');
      
    }
  };

  return (
    <div className="Like-container">
      <h2 className="Like-title">관심단어 지정</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="Like-form">
        <div className="Like-group">
          <label>년도</label>
          <input type="Likeyear" value={Likeyear}  onChange={handleLikeyear}/>
        </div>
        <div className="Like-group">
          <label>국가</label>
          <input type="Likecountry" value={Likecountry}  onChange={handleLikecountry}/>
        </div>
        <div className="Like-group">
          <label>사업종류</label>
          <input type="Likebusiness" value={Likebusiness}  onChange={handleLikebusiness}/>
        </div>
        <div className="error-container">
          {error && <p className="error">{error}</p>}
        </div>
        <button type="submit">지정하기</button>
      </form>
    </div>
  );
};

export default LikePage;