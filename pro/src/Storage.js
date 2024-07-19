import React, { useState, useEffect, useCallback } from 'react';
import './styles/Storage.css';
import apiFetch from './api';

const Storage = () => {
    const [likedDocs, setLikedDocs] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const token = sessionStorage.getItem('token');
  
    // 좋아요 누른 문서 목록 가져오기
    const fetchLikedDocs = useCallback(async () => {
      try {
        const response = await apiFetch('http://localhost:8000/retriever/ai/get/like/text', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.status ===200) {
          throw new Error('Network response was not ok');
        }
        const data = response.data
        setLikedDocs(data.documents);
      } catch (error) {
        console.error('Error fetching liked documents:', error);
      }
    }, [token]);
  
    // 특정 문서 내용 가져오기
    const handleDocClick = (doc) => {
      setSelectedDoc(doc);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedDoc(null);
    };
  
    useEffect(() => {
      fetchLikedDocs(); // 컴포넌트 마운트 시 좋아요 누른 문서 목록 가져오기
    }, [fetchLikedDocs]);
  
    return (
      <div className="container">
        <div className="body">
          <h1 className="header">Liked Documents</h1>
          <div className="docList">
            {likedDocs.map((doc) => (
              <div key={doc.docs_id} className="docItem" onClick={() => handleDocClick(doc)}>
                <span className="docTitle">{doc.title}</span>
                <span className="docTime">{new Date(doc.time).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        {showModal && (
          <div className="modalOverlay" onClick={handleCloseModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <button className="closeButton" onClick={handleCloseModal}>X</button>
              <div className="modalTextContent">
                {selectedDoc?.text.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Storage;
