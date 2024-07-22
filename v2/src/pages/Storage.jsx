import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Storage.css';
import apiFetch from '../api';

const Storage = () => {
    const [likedDocs, setLikedDocs] = useState([]);
    const [expandedDocId, setExpandedDocId] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
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
    // const handleDocClick_panel = (doc) => {
    //   setSelectedDoc(doc);
    //   setShowModal(true);
    // };

    // 문서 제목 클릭 핸들러
    const handleDocClick = (docId) => {
      event.preventDefault(); // 스크롤 방지
      setExpandedDocId(expandedDocId === docId ? null : docId);
    };
  
    // const handleCloseModal = () => {
    //   setShowModal(false);
    //   setSelectedDoc(null);
    // };
  
    useEffect(() => {
      fetchLikedDocs(); // 컴포넌트 마운트 시 좋아요 누른 문서 목록 가져오기
    }, [fetchLikedDocs]);
  
    return (
      <div className="storagecontainer">
        <div className="storagebody">
          <h1 className="storageheader">
            {/* Liked Documents */}
          </h1>
          <div className="docList">
            {likedDocs.map((doc) => (
              <div key={doc.docs_id} className="docItem" onClick={() => handleDocClick(doc.docs_id)}>
                  <span className="docTitle">{doc.title}</span>
                  <span className="docTime">{new Date(doc.time).toLocaleString()}</span>
                {expandedDocId === doc.docs_id && (
                  <div className="docDetail">
                    {doc.text.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Storage;