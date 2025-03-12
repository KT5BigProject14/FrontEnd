import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Storage.css';
import apiFetch from '../api';
// import { LikedContext } from './LikedContexts';

const formatTitleText = (data) => {
  if (typeof data === 'string') {
    try {
      // 문자열을 JSON 객체로 변환
      const jsonData = JSON.parse(data);

      const elements = [];

      // q_key 처리
      if (jsonData.q_key) {
        elements.push(
          <h2 key="q_key" style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '24px' }}>
            {jsonData.q_key}
          </h2>
        );
      }

      // sub_key, content_key, source_key를 동적으로 처리
      let index = 1;
      while (jsonData[`sub_key${index}`]) {
        elements.push(
          <h3 key={`sub_key${index}`} style={{ margin: '10px 0', fontWeight: 'bold', fontSize: '18px' }}>
            {jsonData[`sub_key${index}`]}
          </h3>
        );
        elements.push(
          <p key={`content_key${index}`} style={{ margin: '10px 0', fontSize: '16px' }}>
            {jsonData[`content_key${index}`]}
          </p>
        );
        elements.push(
          <p key={`source_key${index}`} style={{ margin: '10px 0', fontStyle: 'italic', color: 'gray', fontSize: '14px' }}>
            Source: {jsonData[`source_key${index}`]}
          </p>
        );

        index++;
      }

      return elements;
    } catch (error) {
      console.error("JSON parsing error:", error);
      return <p style={{ color: 'red' }}>Invalid JSON format</p>;
    }
  }

  return null;
};


const Storage = () => {
    const [likedDocs, setLikedDocs] = useState([]);
    const [expandedDocId, setExpandedDocId] = useState(null);
  
    const token = sessionStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // 좋아요 누른 문서 목록 가져오기
    const fetchLikedDocs = useCallback(async () => {
      try {
        const response = await apiFetch(`${apiUrl}/retriever/ai/get/like/text`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.status === 200) {
          throw new Error('Network response was not ok');
        }
        const data = response.data
        setLikedDocs(Array.isArray(data.documents) ? data.documents : []);
      } catch (error) {
        console.error('Error fetching liked documents:', error);
        setLikedDocs([]);
      }
    }, [token]);
  

    // 문서 제목 클릭 핸들러
    const handleDocClick = (docId) => {
      event.preventDefault(); // 스크롤 방지
      setExpandedDocId(expandedDocId === docId ? null : docId);
    };
  
    useEffect(() => {
      fetchLikedDocs(); // 컴포넌트 마운트 시 좋아요 누른 문서 목록 가져오기
    }, [fetchLikedDocs]);
  
    return (
      <div className="storage">
        <div className="storagecontainer">
          <div className="storagebody">
            <h1 className="storageheader"></h1>
            {likedDocs.length  === 0 ? (
              <div className="empty-message">
                <div className="docItem">
                <span className="docTitle">저장된 자료가 없습니다.</span>
                </div>
                
              </div>
            ) : (
              <div className="docList">
                {likedDocs.map((doc) => (
                  <div key={doc.docs_id} className="docItem" onClick={() => handleDocClick(doc.docs_id)}>
                    <span className="docTitle">{doc.title}</span>
                    <span className="docTime">{new Date(doc.time).toLocaleString()}</span>
                    {expandedDocId === doc.docs_id && (
                      <div className="docDetail">
                        {formatTitleText(doc.text)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Storage;