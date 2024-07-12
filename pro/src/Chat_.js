import React, { useState, useEffect, useCallback } from "react";
import Menu from './Menu';
import Sessionbar from "./Sessionbar";
import Storagebar from "./Storagebar";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionId, setSessionId] = useState('session8'); // sessionId 상태 추가
  const email = sessionStorage.getItem('email');
  const [sessions, setSessions] = useState([]);
  const [stroages, setStorages] = useState([]);

  useEffect(() => {
    // 여기에 백엔드에서 대화 데이터를 가져오는 API 호출을 추가하세요.
    // 예를 들어, fetch를 사용하여 데이터를 가져올 수 있습니다.
    fetch("/api/sessions") // 적절한 API 엔드포인트로 변경하세요.
      .then(response => response.json())
      .then(data => setSessions(data))
      .catch(error => console.error("Error fetching session data:", error));
  }, []);

  // useEffect(() => {
  //   // 사용자 이메일을 기준으로 Redis에서 세션 데이터를 가져옴
  //   fetch(`http://localhost:8000/retriever/redis/all_messages?user_email=${email}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       const fetchedSessions = [];
  //       const messages = data.messages;
  //       for (let i = 0; i < messages.length; i += 2) {
  //         fetchedSessions.push({ id: messages[i], title: messages[i + 1] });
  //       }
  //       setSessions(fetchedSessions);
  //     })
  //     .catch(error => console.error("Error fetching session data:", error));
  // }, [email]);
  const fetchSessions = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/retriever/redis/all_messages?user_email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const fetchedSessions = [];
      const messages = data.messages;
      for (let i = 0; i < messages.length; i += 2) {
        fetchedSessions.push({ id: messages[i], title: messages[i + 1] });
      }
      setSessions(fetchedSessions);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  }, [email]);

  useEffect(() => {
    fetchSessions(); // 초기 로딩 시 세션 데이터 가져오기
  }, [email, fetchSessions]);


  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'Me', text: input }]);
      setInput('');
      console.log(input,sessionId,email);
      // Fetch 로직 추가
      const response = await fetch('http://localhost:8000/retriever/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: email,
          session_id: sessionId,
          question: input,
        }),
        
      });

      const data = await response.json();
      console.log(data);
      // 응답 메시지를 채팅에 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Bot', text: data.response },
      ]);

      // 세션 ID를 응답에서 받은 값으로 설정
      if (data.session_id) {
        setSessionId(data.session_id);
      }
    }
  };

  const handleSearch = async () => {
    // 검색 로직을 추가합니다.
    console.log('Search query:', searchQuery);
    if (searchQuery.trim()) {
      try {
        const response = await fetch('http://localhost:8000/retriever/ai/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: searchQuery }),
        });
  
        const data = await response.json();
        console.log('Search data received:', data);
  
        // 여기서 응답 데이터를 적절한 상태에 저장하거나 사용하면 됩니다.
        // 예: 검색 결과를 화면에 표시하려면 다음과 같이 할 수 있습니다.
        setStorages(data.storages); // 가정: 서버 응답이 { storages: [...] } 형태일 경우
  
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleSessionClick = (sessionId) => {
    setSessionId(sessionId);
    console.log(`Selected session ID: ${sessionId}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.body}>
        <div style={styles.leftPane}>
          <div style={styles.searchArea}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              placeholder="Search..."
            />
            <button onClick={handleSearch} style={styles.searchButton}>Search</button>
          </div>
          {/* 여기에 사이드바의 다른 내용 추가 */}
        </div>
        <div style={styles.rightPane}>
          <div style={styles.chatArea}>
            {messages.map((message, index) => (
              <div key={index} style={message.sender === 'Me' ? styles.myMessage : styles.botMessage}>
                {message.text}
              </div>
            ))}
          </div>
          <div style={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
      <div>
        <Sessionbar sessions={sessions} onSessionClick={handleSessionClick} />
        <Storagebar stroages={stroages} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    backgroundColor: '#282c34',
    padding: '10px',
    color: 'white',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  body: {
    display: 'flex',
    flex: 1,
  },
  leftPane: {
    flex: 2,
    borderRight: '1px solid #ccc',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  searchArea: {
    display: 'flex',
    marginBottom: '10px',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
    color : '#000000'
  },
  searchButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    cursor: 'pointer',
  },
  rightPane: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  chatArea: {
    flex: 1,
    padding: '10px',
    overflowY: 'scroll',
    borderBottom: '1px solid #ccc',
  },
  myMessage: {
    textAlign: 'right',
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#e1ffc7',
    borderRadius: '10px',
    color:'#000000',
  },
  botMessage: {
    textAlign: 'left',
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#f1f0f0',
    borderRadius: '10px',
    color:'#000000',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
    color : '#000000'
  },
  sendButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    cursor: 'pointer',
  },
};

export default Chat;