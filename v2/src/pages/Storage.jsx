import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Storage.css';
import apiFetch from '../api';

const Storage = () => {
    const [likedDocs, setLikedDocs] = useState([]);
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
      <div className="storagecontainer">
        <div className="storagebody">
          <h1 className="storageheader">
            {/* Liked Documents */}
          </h1>
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

// import React, { useState, useEffect, useCallback } from 'react';
// import '../styles/Storage.css';
// import apiFetch from '../api';

// const Storage = () => {
//     const [likedDocs, setLikedDocs] = useState([]);
//     const [expandedDocId, setExpandedDocId] = useState(null);
  
//     const token = sessionStorage.getItem('token');
//     const apiUrl = import.meta.env.VITE_API_BASE_URL;

//     // 좋아요 누른 문서 목록 가져오기
//     const fetchLikedDocs = useCallback(async () => {
//       try {
//         const response = await apiFetch(`${apiUrl}/retriever/ai/get/like/text`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (response.status !== 200) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setLikedDocs(data.documents);
//       } catch (error) {
//         console.error('Error fetching liked documents:', error);
//       }
//     }, [token]);

//     // 문서 제목 클릭 핸들러
//     const handleDocClick = (docId) => {
//       setExpandedDocId(expandedDocId === docId ? null : docId);
//     };

//     useEffect(() => {
//       fetchLikedDocs(); // 컴포넌트 마운트 시 좋아요 누른 문서 목록 가져오기
//     }, [fetchLikedDocs]);
  
//     return (
//       <div className="storagecontainer">
//         <div className="storagebody">
//           <h1 className="storageheader">Liked Documents</h1>
//           <div className="docList">
//             {likedDocs.map((doc) => (
//               <div key={doc.docs_id} className="docItem">
//                 <div className="docTitle" onClick={() => handleDocClick(doc.docs_id)}>
//                   {doc.title}
//                   <span className="docTime">{new Date(doc.time).toLocaleString()}</span>
//                 </div>
//                 {expandedDocId === doc.docs_id && (
//                   <div className="docDetail">
//                     {doc.text.split('\n').map((line, index) => (
//                       <p key={index}>{line}</p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
// };

// export default Storage;
