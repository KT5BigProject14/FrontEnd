// // src/Sessionbar.js
// import React from "react";
// import LSidebar from "./components/lsidebar";

// const Storagebar = ({ storages, onItemClick }) => {
//   // 날짜별로 storages 그룹화
//   const groupedStorages = groupStoragesByDate(storages);

//   return (
//     <LSidebar width={280}>
//       {storages.length === 0 ? (
//         <p>과거 검색기록이 없습니다.</p>
//       ) : (
//         <ul>
//           {/* {storages.map((session, index) => (
//             <li key={index} style={styles.storageItem} onClick={() => onItemClick(session.docs_id)}>
//             {session.time.slice(5,7)}월 {session.time.slice(8,10)}일 {session.title}
//             </li>
//           ))} */}
//           {Object.keys(groupedStorages).map((date) => (
//             <React.Fragment key={date}>
//               <li style={styles.dateHeader}>
//                 {parseInt(date.slice(5, 7))}월 {parseInt(date.slice(8, 10))}일
//               </li>
//               {groupedStorages[date].map((session, index) => (
//                 <li
//                   key={session.docs_id}
//                   style={styles.storageItem}
//                   onClick={() => onItemClick(session.docs_id)}
//                 >
//                   {session.title}
//                 </li>
//               ))}
//             </React.Fragment>
//           ))}
//         </ul>
//       )}
//     </LSidebar>
//   );
// };

// // 날짜별로 storages 그룹화 함수
// const groupStoragesByDate = (storages) => {
//   return storages.reduce((acc, session) => {
//     const date = session.time.slice(0, 10); // "YYYY-MM-DD" 형식으로 자르기
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(session);
//     return acc;
//   }, {});
// };

// const styles = {
//   storageList: {
//     listStyleType: 'none',
//     padding: 0,
//   },
//   dateHeader: {
//     padding: '10px',
//     margin: '5px 0',
//     fontWeight: 'bold',
//     backgroundColor: '#dcdcdc',
//     textAlign: 'left',
//   },
//   storageItem: {
//     padding: '10px',
//     borderBottom: '1px solid #ccc',
//     color: '#000000',
//     cursor: 'pointer',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '5px',
//     marginBottom: '5px',
//     textAlign: 'left',
//   },
// };

// export default Storagebar;

import React, { useState, useEffect, useCallback } from 'react';
import './styles/Storage.css'; // CSS 파일을 임포트합니다.

const Storage = () => {
    const [likedDocs, setLikedDocs] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const token = sessionStorage.getItem('token');
  
    // 좋아요 누른 문서 목록 가져오기
    const fetchLikedDocs = useCallback(async () => {
      try {
        const response = await fetch('http://localhost:8000/retriever/ai/get_all_text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
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
                <span className="docDetail">{doc.detail}</span> {/* 세부내용 표시 */}
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