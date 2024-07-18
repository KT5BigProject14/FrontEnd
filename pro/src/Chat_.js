// import React, { useState, useEffect, useCallback } from "react"; // useCallback 추가
// import Sessionbar from "./Sessionbar";
// import Storagebar from "./Storagebar";
// import './styles/Chat_.css'

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sessionId, setSessionId] = useState(null); // sessionId 상태 추가
//   const [titles, setTitles] = useState([]);
//   const [titletext, setTitletext] = useState('');
//   const [sessions, setSessions] = useState([]);
//   const [storages, setStorages] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const token = sessionStorage.getItem('token');

//   const fetchSessions = useCallback(async () => {
//     try {
//       const response = await fetch('http://localhost:8000/retriever/redis/all_messages', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       const fetchedSessions = [];
//       const messages = data.messages;
//       for (let i = 0; i < messages.length; i += 3) {
//         fetchedSessions.push({ id: messages[i], title: messages[i + 1], time: messages[i + 2] });
//       }
//       setSessions(fetchedSessions);
//     } catch (error) {
//       console.error("Error fetching session data:", error);
//     }
//   }, [token]);

//   const fetchStorages = useCallback(async () => {
//     try {
//       const response = await fetch('http://localhost:8000/retriever/ai/get_all_title', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: token }),
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setStorages(data.documents);
//     } catch (error) {
//       console.error("Error fetching storages data:", error);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchSessions(); // 초기 로딩 시 세션 데이터 가져오기
//     fetchStorages(); // 초기 로딩 시 저장 데이터 가져오기
//   }, [fetchSessions, fetchStorages]);

//   const fetchMessagesForSession = useCallback(async (sessionId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/retriever/redis/messages/${sessionId}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       const fetchedMessages = [];
//       const messages = data.messages;
//       for (let i = messages.length - 1; i >= 0; i -= 2) {
//         fetchedMessages.push({ sender: 'Me', text: messages[i] });
//         fetchedMessages.push({ sender: 'Bot', text: messages[i - 1] });
//       }
//       setMessages(fetchedMessages);
//       setSessionId(sessionId); // Update the sessionId state
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   }, [token]);

//   const handleSendMessage = async () => {
//     if (input.trim()) {
//       setMessages([...messages, { sender: 'Me', text: input }]);
//       setInput('');
//       console.log(input, sessionId);

//       const response = await fetch('http://localhost:8000/retriever/ai/chat', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           question: input,
//         }),
//       });

//       const data = await response.json();
//       console.log(data);
//       console.log(data.session_id);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'Bot', text: data.response },
//       ]);

//       if (data.session_id) {
//         setSessionId(data.session_id);
//       }
//     }
//   };

//   const handleSearch = async () => {
//     console.log('Search query:', searchQuery);
//     if (searchQuery.trim()) {
//       try {
//         const response = await fetch('http://localhost:8000/retriever/ai/title', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ question: searchQuery }),
//         });

//         const data = await response.json();
//         console.log('Search data received:', data);

//         // Update titles state with elements from index 1 to 5
//         if (data.title) {
//           setTitles(data.title.slice(0, 6));
//         } else {
//           console.error("Error: 'title' is undefined in the response data.");
//         }
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setTitles([]);
//       }
//     }
//   };

//   const handleSessionClick = (sessionId) => {
//     setSessionId(sessionId);
//     console.log(`Selected session ID: ${sessionId}`);
//     fetchMessagesForSession(sessionId); // Fetch messages for the selected session
//   };

//   const handleTitleClick = async (title) => { // handleSessionClick 안에 중첩된 handleTitleClick을 밖으로 이동시킴
//     try {
//       const response = await fetch('http://localhost:8000/retriever/ai/text', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: title }),
//       });
//       const data = await response.json();
//       console.log('Document data received:', data.text);
//       setTitletext(data.text);

//       fetchStorages();

//     } catch (error) {
//       console.error('Error fetching document:', error);
//     }
//   };

//   const handleDocClick = async (docs_id) => {
//     try {
//       const response = await fetch('http://localhost:8000/retriever/ai/get_text', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ docs_id }),
//       });

//       const data = await response.json();
//       console.log(typeof data.text)
//       setSelectedDoc({ docs_id, text: data.text || "" });
//       setShowModal(true);
//     } catch (error) {
//       console.error('Error fetching document text:', error);
//     }
//   };

//   const handleCloseModal = (e) => {
//     // Storagebar를 클릭한 경우에는 패널을 닫지 않음
//     if (e.target.closest('.storage-bar')) {
//       return;
//     }
//     setShowModal(false);
//     setSelectedDoc(null);
//   };

//   const handleStorageItemClick = (docs_id) => {
//     handleDocClick(docs_id);
//   };

//   const handleLikeClick = async () => {
//     if (selectedDoc) {
//       try {
//         const response = await fetch('http://localhost:8000/retriever/ai/like', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ docs_id: selectedDoc.docs_id }),
//         });

//         const data = await response.json();
//         console.log('Like status:', data.is_like);

//         // 하트 색상 업데이트
//         setSelectedDoc(prevDoc => ({
//           ...prevDoc,
//           is_like: data.is_like
//         }));
//       } catch (error) {
//         console.error('Error liking document:', error);
//       }
//     }
//   };

//   // Handler to create a new session
//   const handleNewConversation = () => {
//     setSessionId(null);
//     setMessages([]);
//   };

//   const handleInputKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   const handleSearchKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const formatTitleText = (text) => {
//     // HTML 형식으로 텍스트를 변환하는 함수
//     if (typeof text !== 'string') return null; // 텍스트가 문자열이 아닐 경우 null 반환
//     return text.split('\n').map((line, index) => (
//       <p key={index} style={{ margin: '0 0 10px' }}>
//         {line}
//       </p>
//     ));
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.body}>
//         <div style={styles.leftPane}>
//           <div style={styles.searchArea}>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearchKeyDown}
//               style={styles.searchInput}
//               placeholder="Search..."
//             />
//             <button onClick={handleSearch} style={styles.searchButton}>Search</button>
//           </div>
//           {titles.length > 0 && (
//             <div style={styles.storageList}>
//               {titles.map((title, index) => (
//                 <button key={index} style={styles.storageItem} onClick={() => handleTitleClick(title)}>
//                   {title}
//                 </button>
//               ))}
//             </div>
//           )}
//           {titletext && (
//             <div style={styles.titleTextArea}>
//               {formatTitleText(titletext)}
//             </div>
//           )}
//         </div>
//         <div style={styles.rightPane}>
//           <div style={styles.chatArea}>
//             {messages.map((message, index) => (
//               <div key={index} style={message.sender === 'Me' ? styles.myMessage : styles.botMessage}>
//                 {message.text}
//               </div>
//             ))}
//           </div>
//           <div style={styles.inputArea}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//               style={styles.input}
//               placeholder="Type your message here..."
//             />
//             <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
//             <button onClick={handleNewConversation} style={styles.newConversationButton}>New Conversation</button>
//           </div>
//         </div>
//       </div>
//       <div>
//         <Sessionbar sessions={sessions} onSessionClick={handleSessionClick} fetchSessions={fetchSessions} />
//         <Storagebar storages={storages} onItemClick={handleStorageItemClick} />
//       </div>
//       {showModal && (
//         <div style={styles.modalOverlay} onClick={handleCloseModal}>
//           <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <button style={styles.closeButton} onClick={handleCloseModal}>X</button>
//             <div style={styles.modalTextContent}>
//               {formatTitleText(selectedDoc?.text)}
//             </div>
//             <button style={getLikeButtonStyle(selectedDoc?.is_like)} onClick={handleLikeClick}>
//               ❤
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100vh',
//   },
//   body: {
//     display: 'flex',
//     flex: 1,
//   },
//   leftPane: {
//     flex: 2, // 2:1 비율로 조정
//     borderRight: '1px solid #ccc',
//     padding: '10px',
//     display: 'flex',
//     flexDirection: 'column',
//     overflowY: 'auto',
//   },
//   searchArea: {
//     display: 'flex',
//     marginBottom: '10px',
//   },
//   searchInput: {
//     flex: 1,
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     marginRight: '10px',
//     color: '#000000',
//   },
//   searchButton: {
//     padding: '10px 20px',
//     borderRadius: '5px',
//     border: 'none',
//     backgroundColor: '#61dafb',
//     cursor: 'pointer',
//   },
//   storageList: {
//     marginTop: '10px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: '#f9f9f9',
//   },
//   storageItem: {
//     padding: '10px',
//     borderBottom: '1px solid #ccc',
//     color: '#000000',
//   },
//   titleTextArea: {
//     marginTop: '10px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: '#f9f9f9',
//     color: '#000000',
//   },
//   rightPane: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   chatArea: {
//     flex: 1,
//     padding: '10px',
//     overflowY: 'scroll',
//     borderBottom: '1px solid #ccc',
//   },
//   myMessage: {
//     textAlign: 'right',
//     margin: '5px 0',
//     padding: '10px',
//     backgroundColor: '#e1ffc7',
//     borderRadius: '10px',
//     color: '#000000',
//   },
//   botMessage: {
//     textAlign: 'left',
//     margin: '5px 0',
//     padding: '10px',
//     backgroundColor: '#f1f0f0',
//     borderRadius: '10px',
//     color: '#000000',
//   },
//   inputArea: {
//     display: 'flex',
//     padding: '10px',
//   },
//   input: {
//     flex: 1,
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     marginRight: '10px',
//     color: '#000000',
//   },
//   sendButton: {
//     padding: '10px 20px',
//     borderRadius: '5px',
//     border: 'none',
//     backgroundColor: '#61dafb',
//     cursor: 'pointer',
//   },
//   newConversationButton: {
//     marginTop: '10px',
//     padding: '10px 20px',
//     borderRadius: '5px',
//     border: 'none',
//     backgroundColor: '#61dafb',
//     cursor: 'pointer',
//   },

//   modalOverlay: {
//     position: 'fixed',
//     top: 0,
//     left: '280px', // storageBar를 포함하지 않도록 설정
//     width: 'calc(100% - 280px)', // storageBar를 제외한 너비
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // 불투명한 검정색 배경
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
//   },
//   modalContent: {
//     backgroundColor: 'rgba(1, 0, 0, 0.9)', // 불투명한 검정색 배경
//     padding: '20px',
//     borderRadius: '10px',
//     position: 'relative',
//     maxWidth: '80%',
//     maxHeight: '80%',
//     overflowY: 'auto',
//     color: 'white', // 텍스트 색상 흰색으로 변경
//     // marginLeft: '300px', // 왼쪽 storagebar와 겹치지 않도록 오른쪽으로 이동
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     background: 'transparent',
//     border: 'none',
//     fontSize: '20px',
//     cursor: 'pointer',
//     color: 'white', // 닫기 버튼 색상 흰색으로 변경
//   },
//   modalTextContent: {
//     marginTop: '20px',
//     color: 'white', // 텍스트 색상 흰색으로 변경
//   },
//   likeButton: {
//     position: 'absolute',
//     bottom: '10px',
//     right: '10px',
//     background: 'transparent',
//     border: '2px solid white', // 흰색 실선 테두리
//     fontSize: '30px',
//     cursor: 'pointer',
//     borderRadius: '50%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '50px',
//     height: '50px',
//     transition: 'color 0.3s ease, background-color 0.3s ease', // 애니메이션 추가
//     color: 'white',
//   },
//   likeButtonLiked: {
//     color: 'red',
//     backgroundColor: 'white',
//     transition: 'color 0.3s ease, background-color 0.3s ease', // 애니메이션 추가
//   },
// };

// const getLikeButtonStyle = (isLiked) => {
//   const baseStyle = styles.likeButton;
//   if (isLiked) {
//     return { ...baseStyle, color: 'red', background: 'white' };
//   }
//   return baseStyle;
// };

// export default Chat;





import React, { useState, useEffect, useCallback } from "react";
import Sessionbar from "./Sessionbar";
import Storagebar from "./Storagebar";
import './styles/Chat_.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [titles, setTitles] = useState([]);
  const [titletext, setTitletext] = useState('');
  const [sessions, setSessions] = useState([]);
  const [storages, setStorages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const token = sessionStorage.getItem('token');

  const fetchSessions = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/retriever/redis/all_messages', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const fetchedSessions = [];
      const messages = data.messages;
      for (let i = 0; i < messages.length; i += 3) {
        fetchedSessions.push({ id: messages[i], title: messages[i + 1], time: messages[i + 2] });
      }
      setSessions(fetchedSessions);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  }, [token]);

  const fetchStorages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/retriever/ai/get_all_title', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: token }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStorages(data.documents);
    } catch (error) {
      console.error("Error fetching storages data:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchSessions(); // 초기 로딩 시 세션 데이터 가져오기
    fetchStorages(); // 초기 로딩 시 저장 데이터 가져오기
  }, [fetchSessions, fetchStorages]);

  const fetchMessagesForSession = useCallback(async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:8000/retriever/redis/messages/${sessionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const fetchedMessages = [];
      const messages = data.messages;
      for (let i = messages.length - 1; i >= 0; i -= 2) {
        fetchedMessages.push({ sender: 'Me', text: messages[i] });
        fetchedMessages.push({ sender: 'Bot', text: messages[i - 1] });
      }
      setMessages(fetchedMessages);
      setSessionId(sessionId); // Update the sessionId state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [token]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'Me', text: input }]);
      setInput('');
      console.log(input, sessionId);

      const response = await fetch('http://localhost:8000/retriever/ai/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          question: input,
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.session_id);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Bot', text: data.response },
      ]);

      if (data.session_id) {
        setSessionId(data.session_id);
      }
    }
  };

  const handleSearch = async () => {
    console.log('Search query:', searchQuery);
    if (searchQuery.trim()) {
      try {
        const response = await fetch('http://localhost:8000/retriever/ai/title', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: searchQuery }),
        });

        const data = await response.json();
        console.log('Search data received:', data);

        // Update titles state with elements from index 1 to 5
        if (data.title) {
          setTitles(data.title.slice(0, 6));
        } else {
          console.error("Error: 'title' is undefined in the response data.");
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setTitles([]);
      }
    }
  };

  const handleSessionClick = (sessionId) => {
    setSessionId(sessionId);
    console.log(`Selected session ID: ${sessionId}`);
    fetchMessagesForSession(sessionId); // Fetch messages for the selected session
  };

  const handleTitleClick = async (title) => {
    try {
      const response = await fetch('http://localhost:8000/retriever/ai/text', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
      });
      const data = await response.json();
      console.log('Document data received:', data.text);
      setTitletext(data.text);

      fetchStorages();

    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const handleDocClick = async (docs_id) => {
    try {
      const response = await fetch('http://localhost:8000/retriever/ai/get_text', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docs_id }),
      });

      const data = await response.json();
      console.log(typeof data.text);
      setSelectedDoc({ docs_id, text: data.text || "" });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching document text:', error);
    }
  };

  const handleCloseModal = (e) => {
    // Storagebar를 클릭한 경우에는 패널을 닫지 않음
    if (e.target.closest('.storage-bar')) {
      return;
    }
    setShowModal(false);
    setSelectedDoc(null);
  };

  const handleStorageItemClick = (docs_id) => {
    handleDocClick(docs_id);
  };

  const handleLikeClick = async () => {
    if (selectedDoc) {
      try {
        const response = await fetch('http://localhost:8000/retriever/ai/like', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ docs_id: selectedDoc.docs_id }),
        });

        const data = await response.json();
        console.log('Like status:', data.is_like);

        // 하트 색상 업데이트
        setSelectedDoc(prevDoc => ({
          ...prevDoc,
          is_like: data.is_like
        }));
      } catch (error) {
        console.error('Error liking document:', error);
      }
    }
  };

  // Handler to create a new session
  const handleNewConversation = () => {
    setSessionId(null);
    setMessages([]);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatTitleText = (text) => {
    // HTML 형식으로 텍스트를 변환하는 함수
    if (typeof text !== 'string') return null; // 텍스트가 문자열이 아닐 경우 null 반환
    return text.split('\n').map((line, index) => (
      <p key={index} style={{ margin: '0 0 10px' }}>
        {line}
      </p>
    ));
  };

  return (
    <div className="container">
      <div className="body">
        <div className="leftPane">
          <div className="searchArea">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="searchInput"
              placeholder="검색할 내용을 넣어주세요"
            />
            <button onClick={handleSearch} className="searchButton">
              <i className="fa fa-search"></i>
            </button>
          </div>

          {titles.length > 0 && (
            <div className="storageList">
              {titles.map((title, index) => (
                <button key={index} className="storageItem" onClick={() => handleTitleClick(title)}>
                  {title}
                </button>
              ))}
            </div>
          )}
          {titletext && (
            <div className="titleTextArea">
              {formatTitleText(titletext)}
            </div>
          )}
        </div>
        <div className="rightPane">
          <div className="chatArea">
            {messages.map((message, index) => (
              <div key={index} className={message.sender === 'Me' ? 'myMessage' : 'botMessage'}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="inputArea">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="input"
              placeholder="질문할 내용을 작성해주세요"
            />
            <button onClick={handleSendMessage} className="sendButton">
              <i className="fas fa-paper-plane"></i>
            </button>
            <button onClick={handleNewConversation} className="newConversationButton">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <Sessionbar sessions={sessions} onSessionClick={handleSessionClick} fetchSessions={fetchSessions} />
      <Storagebar storages={storages} onItemClick={handleStorageItemClick} />
      {showModal && (
        <div className="modalOverlay" onClick={handleCloseModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeButton" onClick={handleCloseModal}>X</button>
            <div className="modalTextContent">
              {formatTitleText(selectedDoc?.text)}
            </div>
            <button className={selectedDoc?.is_like ? 'likeButton likeButtonLiked' : 'likeButton'} onClick={handleLikeClick}>
              ❤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;