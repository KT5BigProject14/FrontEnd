import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Storage.css';
import apiFetch from '../api';
// import { LikedContext } from './LikedContexts';

const formatTitleText = (data) => {

  if (typeof data === 'string') {
    const elements = [];
    const lines = data.split('\n');
    lines.forEach((line) => {
      // console.log(line)
      // console.log('trim line', line.trim())
      line = line.trim()
      // console.log('source_key ? :', line.trim().startsWith('source_key'))
      if (line.startsWith('q_key')) {
        elements.push(
          <h2 key="q_key" style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '24px' }}>
            {line.split(':')[1].trim().replace(/["{},]/g, '')}
          </h2>
        );
      } else if (line.startsWith('sub_key')) {
        elements.push(
          <h3 key={line} style={{ margin: '10px 0', fontWeight: 'bold', fontSize: '18px' }}>
            {line.split(':')[1].trim().replace(/["{},]/g, '')}
          </h3>
        );
      } else if (line.startsWith('content_key')) {
        elements.push(
          <p key={line} style={{ margin: '10px 0', fontSize: '16px' }}>
            {line.split(':')[1].trim().replace(/["{},]/g, '')}
          </p>
        );
      } else if (line.startsWith('source_key')) {
        const sourceText = line.replace(/^[^:]+:\s*/, '').trim().replace(/["{},]/g, '');
        elements.push(
          <p key={line} style={{ margin: '10px 0', fontStyle: 'italic', color: 'gray', fontSize: '14px' }}>
            Source: {sourceText}
          </p>
        );
      }
    });

    return elements;
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