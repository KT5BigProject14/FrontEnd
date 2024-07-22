import React, { useState, useEffect, useCallback } from "react";
import Sessionbar from "./Sessionbar";
import Storagebar from "./Storagebar";
import apiFetch from "../api";
import '../styles/Chat_.css';
import { FaInfoCircle, FaSearch, FaPaperPlane, FaPlus } from 'react-icons/fa';

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
  const [isLoadingsearching, setIsLoadingsearching] = useState(false); // 로딩 상태 변수 추가
  const [isLoadingchat, setIsLoadingchat] = useState(false); // 로딩 상태 변수 추가
  const [copySuccess, setCopySuccess] = useState(false); // 복사 상태 변수 추가
  const [copyPosition, setCopyPosition] = useState({ x: 0, y: 0 }); // 복사 위치 변수 추가
  const token = sessionStorage.getItem('token');

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchSessions = useCallback(async () => {
    try {
      const response = await apiFetch(`${apiUrl}/retriever/redis/all/messages`, {
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
      const response = await apiFetch(`${apiUrl}/retriever/ai/view/all/title`, {
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
      const response = await apiFetch(`${apiUrl}/retriever/redis/messages/${sessionId}`, {
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
      setIsLoadingchat(true); // 로딩 시작
      setMessages([...messages, { sender: 'Me', text: input }]);
      setInput('');
      console.log(input, sessionId);

      const response = await apiFetch(`${apiUrl}/retriever/ai/chat`, {
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
      setIsLoadingchat(false); // 로딩 종료
    }
  };

  const handleSearch = async () => {
    console.log('Search query:', searchQuery);
    if (searchQuery.trim()) {
      setIsLoadingsearching(true); // 로딩 시작
      try {
        const response = await apiFetch(`${apiUrl}/retriever/ai/title`, {
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
      setIsLoadingsearching(false); // 로딩 종료
    }
  };

  const handleSessionClick = (sessionId) => {
    setSessionId(sessionId);
    console.log(`Selected session ID: ${sessionId}`);
    fetchMessagesForSession(sessionId);
  };

  const handleTitleClick = async (title) => {
    try {
      const response = await apiFetch(`${apiUrl}/retriever/ai/text`, {
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
      const response = await apiFetch(`${apiUrl}/retriever/ai/view/text/${docs_id}`, {
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
        const response = await apiFetch(`${apiUrl}/retriever/ai/like`, {
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

  const handleBotMessageClick = (e, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setCopyPosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setCopySuccess(false);
      }, 750);
    });
  };

  const formatTitleText = (data) => {
    if (typeof data !== 'object' || data === null) return null;
  
    const elements = [];
  
    elements.push(
      <h2 key="q_key" style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '24px' }}>
        {data.q_key}
      </h2>
    );
  
    Object.keys(data).forEach((key) => {
      if (key.startsWith('sub_key')) {
        elements.push(
          <h3 key={key} style={{ margin: '10px 0', fontWeight: 'bold' }}>
            {data[key]}
          </h3>
        );
      } else if (key.startsWith('content_key')) {
        elements.push(
          <p key={key} style={{ margin: '10px 0' }}>
            {data[key]}
          </p>
        );
      } else if (key.startsWith('source_key')) {
        elements.push(
          <p key={key} style={{ margin: '10px 0', fontStyle: 'italic', color: 'gray' }}>
            Source: {data[key]}
          </p>
        );
      }
    });
  
    return elements;
  };

  return (
    <div className="chat">
      <div className="chatcontainer">
        <div className="chatbody">
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
                disabled={isLoadingsearching} // 로딩 중일 때 입력 비활성화
              />
              <button onClick={handleSearch} className="searchButton" disabled={isLoadingsearching}>
                {isLoadingsearching ? <div className="spinner"></div> : <FaSearch />}
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
                {titletext}
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
                // <div key={index} className={message.sender === 'Me' ? 'myMessage' : 'botMessage'}>
                //   {message.text}
                // </div>
                <div
                  key={index}
                  className={`messageContainer ${message.sender === 'Me' ? 'myMessageContainer' : 'botMessageContainer'}`}
                  onClick={(e) => message.sender !== 'Me' && handleBotMessageClick(e, message.text)}
                >
                  {message.sender === 'Me' && <div className="messageIcon"></div>}
                  <div className={message.sender === 'Me' ? 'myMessage' : 'botMessage'}>
                    {message.text}
                  </div>
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
                disabled={isLoadingchat} // 로딩 중일 때 입력 비활성화
              />
              <button onClick={handleSendMessage} className="sendButton" disabled={isLoadingchat}>
                {isLoadingchat ? <div className="spinner"></div> : <FaPaperPlane />}
              </button>
              <button onClick={handleNewConversation} className="newConversationButton" disabled={isLoadingchat}>
                <FaPlus />
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
                {selectedDoc?.text}
              </div>
              <button className={selectedDoc?.is_like ? 'likeButton likeButtonLiked' : 'likeButton'} onClick={handleLikeClick}>
                ❤
              </button>
            </div>
          </div>
        )}
        {copySuccess && (
          <div className="copyNotification" style={{ top: copyPosition.y, left: copyPosition.x }}>
            복사되었습니다!
          </div>
        )}
      </div>
    </div>
  );

}
export default Chat;