import React, { useState, useEffect, useCallback } from "react"; // useCallback 추가
import Sessionbar from "./Sessionbar";
import Stroagebar from "./Stroagebar";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionId, setSessionId] = useState(''); // sessionId 상태 추가
  const email = sessionStorage.getItem('email');
  const [titles, setTitles] = useState([]);
  const [titletext, setTitletext] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [stroages, setStroages] = useState([]);

  // useEffect(() => {
  //   // 여기에 백엔드에서 대화 데이터를 가져오는 API 호출을 추가하세요.
  //   // 예를 들어, fetch를 사용하여 데이터를 가져올 수 있습니다.
  //   fetch("/api/sessions") // 적절한 API 엔드포인트로 변경하세요.
  //     .then(response => response.json())
  //     .then(data => setSessions(data))
  //     .catch(error => console.error("Error fetching session data:", error));
  // }, []);

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

  const fetchMessagesForSession = useCallback(async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:8000/retriever/redis/messages/${email}/${sessionId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const fetchedMessages = [];
      const messages = data.messages;
      for (let i = messages.length-1; i >=0; i -= 2) {
        fetchedMessages.push({ sender: 'Me', text: messages[i] });
        fetchedMessages.push({ sender: 'Bot', text: messages[i - 1] });
      }
      setMessages(fetchedMessages);
      setSessionId(sessionId); // Update the sessionId state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [email]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'Me', text: input }]);
      setInput('');
      console.log(input, sessionId, email);

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

  const handleTitleClick = async (title) => { // handleSessionClick 안에 중첩된 handleTitleClick을 밖으로 이동시킴
    try {
      const response = await fetch('http://localhost:8000/retriever/ai/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: email, title: title }),
      });
      const data = await response.json();
      console.log('Document data received:', data.text);
      setTitletext(data.text);

    } catch (error) {
      console.error('Error fetching document:', error);
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


  return (
    <div style={styles.container}>
      <div style={styles.body}>
        <div style={styles.leftPane}>
          <div style={styles.searchArea}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              style={styles.searchInput}
              placeholder="Search..."
            />
            <button onClick={handleSearch} style={styles.searchButton}>Search</button>
          </div>
          <div style={styles.storageList}>
            {titles.map((title, index) => (
              <button key={index} style={styles.storageItem} onClick={() => handleTitleClick(title)}>
                {title}
              </button>
            ))}
          </div>
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
              onKeyDown={handleInputKeyDown}
              style={styles.input}
              placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
            <button onClick={handleNewConversation} style={styles.newConversationButton}>New Conversation</button>
          </div>
        </div>
      </div>
      <div>
        <Sessionbar sessions={sessions} onSessionClick={handleSessionClick} fetchSessions={fetchSessions} />
        <Stroagebar stroages={stroages} />
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
    overflowY: 'auto',
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
    color: '#000000',
  },
  searchButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    cursor: 'pointer',
  },
  storageList: {
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  storageItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    color: '#000000',
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
    color: '#000000',
  },
  botMessage: {
    textAlign: 'left',
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#f1f0f0',
    borderRadius: '10px',
    color: '#000000',
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
    color: '#000000',
  },
  sendButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    cursor: 'pointer',
  },
  newConversationButton: {
    marginTop: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    cursor: 'pointer',
  },
};

export default Chat;
