import React, { useState, useRef, useEffect } from 'react';
import './Chat_.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const userInput = useRef(null);
  const chatLog = useRef(null);
  const typingIndicator = useRef(null);

  const handleSendMessage = () => {
    const message = userInput.current.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    userInput.current.value = '';

    console.log('API Key:', process.env.REACT_APP_OPENAI_API_KEY); // 디버그용 로그 추가

    postData('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
      temperature: 0.7,
    })
      .then(data => {
        if (data.choices && data.choices.length > 0) {
          appendMessage('bot', data.choices[0].message.content.trim());
        } else {
          appendMessage('bot', 'Error: No response from API');
        }
        updateButtonIcon(false);
      })
      .catch(error => {
        console.error('Error:', error);
        appendMessage('bot', 'Error: Check Your API Key!');
        updateButtonIcon(false);
      });

    updateButtonIcon(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
      userInput.current.value = '';
      typingIndicator.current.style.display = 'none';
    }
  };

  const updateButtonIcon = (isLoading) => {
    const buttonIcon = document.getElementById('button-icon');
    if (isLoading) {
      buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');
    } else {
      buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }
  };

  const postData = (url = '', data = {}) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };

  const appendMessage = (sender, message) => {
    const newMessage = { sender, message };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Scroll to bottom
    setTimeout(() => {
      chatLog.current.scrollTop = chatLog.current.scrollHeight;
    }, 100);
  };

  useEffect(() => {
    const handleTyping = () => {
      if (userInput.current.value.length > 0) {
        typingIndicator.current.style.display = 'flex';
      } else {
        typingIndicator.current.style.display = 'none';
      }
    };

    userInput.current.addEventListener('input', handleTyping);
    userInput.current.addEventListener('blur', () => {
      typingIndicator.current.style.display = 'none';
    });

    return () => {
      userInput.current.removeEventListener('input', handleTyping);
    };
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div id="back-button" className="back-button" onClick={() => window.location.href = '/'}>
          <em>
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </em>
          <span>Main</span>
        </div>
        <div id="admin-button" className="back-button" onClick={() => window.location.href = '/admin/'}>
          <em>
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </em>
          <span>Admin</span>
        </div>
        <h3>Chatbot</h3>
      </div>

      <div className="chat-container" ref={chatLog}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-box ${msg.sender}`}>
            {msg.sender === 'user' ? (
              <>
                <div className="icon" id="user-icon">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="user">{msg.message}</div>
              </>
            ) : (
              <>
                <div className="bot">{msg.message}</div>
                <div className="icon" id="bot-icon">
                  <i className="fa-solid fa-robot"></i>
                </div>
              </>
            )}
          </div>
        ))}
        <div className="chat-box" id="typingIndicator" ref={typingIndicator}>
          <div className="icon" id="user-icon">
            <i className="fa-regular fa-user"></i>
          </div>
          <div className="loading" id="user">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="faq-container" id="faqContainer">
        <div className="faq-card" data-question="WTO와 국제통상규범에 대해 알려주세요." onClick={() => (userInput.current.value = "WTO와 국제통상규범에 대해 알려주세요.")}>
          <div>
            <i className="fas fa-solid fa-hippo"></i>
            <p>국제통상규범</p>
          </div>
        </div>
        <div className="faq-card" data-question="글로벌 환경 정책,산업,기술 동향을 알려주세요." onClick={() => (userInput.current.value = "글로벌 환경 정책,산업,기술 동향을 알려주세요.")}>
          <div>
            <i className="fas fa-solid fa-horse"></i>
            <p>국제환경정책</p>
          </div>
        </div>
        <div className="faq-card" data-question="국내에 해외진출 기업을 지원하는 기관이 있나요?" onClick={() => (userInput.current.value = "국내에 해외진출 기업을 지원하는 기관이 있나요?")}>
          <div>
            <i className="fas fa-solid fa-cat"></i>
            <p>해외진출지원</p>
          </div>
        </div>
        <div className="faq-card" data-question="아시아 시장에서 인도가 차지하는 비율을 알려주세요." onClick={() => (userInput.current.value = "아시아 시장에서 인도가 차지하는 비율을 알려주세요.")}>
          <div>
            <i className="fas fa-solid fa-kiwi-bird"></i>
            <p>인도 시장</p>
          </div>
        </div>
      </div>

      <div className="input-container">
        <input type="text" id="user-input" placeholder="메시지를 입력하세요." ref={userInput} onKeyDown={handleKeyDown} />
        <button id="send-button" onClick={handleSendMessage}>
          <i className="fa-solid fa-paper-plane" id="button-icon"></i>
        </button>
        <button id="refresh-button" onClick={() => setMessages([])}>
          <i className="fa-solid fa-sync" id="refresh-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;