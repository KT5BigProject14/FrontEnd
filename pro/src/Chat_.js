// import React, { useState, useEffect, useCallback } from "react";
// import Sessionbar from "./Sessionbar";
// import Storagebar from "./Storagebar";
// import './styles/Chat_.css';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sessionId, setSessionId] = useState(null);
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

//   const handleTitleClick = async (title) => {
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
//       console.log(typeof data.text);
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
//     <div className="container">
//       <div className="body">
//         <div className="leftPane">
//           <div className="searchArea">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearchKeyDown}
//               className="searchInput"
//               placeholder="검색할 내용을 넣어주세요"
//             />
//             <button onClick={handleSearch} className="searchButton">
//               <i className="fa fa-search"></i>
//             </button>
//           </div>

//           {titles.length > 0 && (
//             <div className="storageList">
//               {titles.map((title, index) => (
//                 <button key={index} className="storageItem" onClick={() => handleTitleClick(title)}>
//                   {title}
//                 </button>
//               ))}
//             </div>
//           )}
//           {titletext && (
//             <div className="titleTextArea">
//               {formatTitleText(titletext)}
//             </div>
//           )}
//         </div>
//         <div className="rightPane">
//           <div className="chatArea">
//             {messages.map((message, index) => (
//               <div key={index} className={message.sender === 'Me' ? 'myMessage' : 'botMessage'}>
//                 {message.text}
//               </div>
//             ))}
//           </div>
//           <div className="inputArea">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleInputKeyDown}
//               className="input"
//               placeholder="질문할 내용을 작성해주세요"
//             />
//             <button onClick={handleSendMessage} className="sendButton">
//               <i className="fas fa-paper-plane"></i>
//             </button>
//             <button onClick={handleNewConversation} className="newConversationButton">
//               <i className="fas fa-plus"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//       <Sessionbar sessions={sessions} onSessionClick={handleSessionClick} fetchSessions={fetchSessions} />
//       <Storagebar storages={storages} onItemClick={handleStorageItemClick} />
//       {showModal && (
//         <div className="modalOverlay" onClick={handleCloseModal}>
//           <div className="modalContent" onClick={(e) => e.stopPropagation()}>
//             <button className="closeButton" onClick={handleCloseModal}>X</button>
//             <div className="modalTextContent">
//               {formatTitleText(selectedDoc?.text)}
//             </div>
//             <button className={selectedDoc?.is_like ? 'likeButton likeButtonLiked' : 'likeButton'} onClick={handleLikeClick}>
//               ❤
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect, useCallback } from "react";
import Sessionbar from "./Sessionbar";
import Storagebar from "./Storagebar";
import apiFetch from "./api";
import './styles/Chat_.css';
import { FaInfoCircle } from 'react-icons/fa';

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
  const [showTooltip, setShowTooltip] = useState(false);
  const [showRightTooltip, setShowRightTooltip] = useState(false);
  const token = sessionStorage.getItem('token');

  const fetchSessions = useCallback(async () => {
    try {
      const response = await apiFetch('http://localhost:8000/retriever/redis/all/messages', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.status ===200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data
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
      const response = await apiFetch('http://localhost:8000/retriever/ai/view/all/title', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.status ===200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data
      setStorages(data.documents);
    } catch (error) {
      console.error("Error fetching storages data:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchSessions();
    fetchStorages();
  }, [fetchSessions, fetchStorages]);
  const fetchMessagesForSession = useCallback(async (sessionId) => {
    try {
      const response = await apiFetch(`http://localhost:8000/retriever/redis/messages/${sessionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.status ===200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data
      const fetchedMessages = [];
      const messages = data.messages;
      for (let i = messages.length - 1; i >= 0; i -= 2) {
        fetchedMessages.push({ sender: 'Me', text: messages[i] });
        fetchedMessages.push({ sender: 'Bot', text: messages[i - 1] });
      }
      setMessages(fetchedMessages);
      setSessionId(sessionId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [token]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'Me', text: input }]);
      setInput('');
      console.log(input, sessionId);

      const response = await apiFetch('http://localhost:8000/retriever/ai/chat', {
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

      const data = response.data;
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
        const response = await apiFetch('http://localhost:8000/retriever/ai/title', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: searchQuery }),
        });

        const data = response.data
        console.log('Search data received:', data);

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
    fetchMessagesForSession(sessionId);
  };

  const handleTitleClick = async (title) => {
    try {
      const response = await apiFetch('http://localhost:8000/retriever/ai/text', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
      });
      const data = response.data
      console.log('Document data received:', data.text);
      setTitletext(data.text);

      fetchStorages();

    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const handleDocClick = async (docs_id) => {
    try {
      const response = await apiFetch(`http://localhost:8000/retriever/ai/view/text/${docs_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log(typeof data.text)
      setSelectedDoc({ docs_id, text: data.text || "" });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching document text:', error);
    }
  };

  const handleCloseModal = (e) => {
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
        const response = await apiFetch('http://localhost:8000/retriever/ai/like', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ docs_id: selectedDoc.docs_id }),
        });

        const data = response.data
        console.log('Like status:', data.is_like);

        setSelectedDoc(prevDoc => ({
          ...prevDoc,
          is_like: data.is_like
        }));
      } catch (error) {
        console.error('Error liking document:', error);
      }
    }
  };

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
    if (typeof text !== 'string') return null;
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
          <div className="infoIcon">
              <FaInfoCircle onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}/>
              {showTooltip && (
                <div className="tooltip">
                  구글, 네이버처럼 검색 기능이 담겨져 있어요. <br />
                특별한 점은, 여러분이 주신 질문에 대한 <br />
                추가 관련질문을 5개를 GenAI를 통해 추천드리고 <br />
                해당 관련질문 중 관심있는 질문을 클릭 시 더 자세한 정보를 제공드립니다:)
                </div>
              )}
            </div>
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
          <div className="infoIcon">
            <FaInfoCircle onMouseEnter={() => setShowRightTooltip(true)} onMouseLeave={() => setShowRightTooltip(false)}/>
            {showRightTooltip && (
              <div className="tooltip">
                검색 엔진에서 찾아본 정보 중 <br />
                궁금한 점을 챗봇에게 편하게 질문주시면 <br />
                자세한 답변드리겠습니다:) 
              </div>
            )}
          </div>
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

}
export default Chat;