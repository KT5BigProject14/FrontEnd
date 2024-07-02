// src/HeroComponent.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroComponent.css'; // CSS 파일 임포트
import { Link } from 'react-router-dom';


const HeroComponent = ({ isLoggedIn, handleLogout }) => {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);

  const updatePosition = (x, y) => {
    const xPercent = Math.round((x / window.innerWidth) * 100);
    const yPercent = Math.round((y / window.innerHeight) * 100);

    gsap.to(heroRef.current, {
      '--x': `${xPercent}%`,
      '--y': `${yPercent}%`,
      duration: 0.2,
      ease: 'sine.out',
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      e.preventDefault();
      const { clientX, clientY } = e;
      updatePosition(clientX, clientY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const { clientX, clientY } = e.touches[0];
        updatePosition(clientX, clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const overlay = overlayRef.current;
    overlay.style.left = `${clientX}px`;
    overlay.style.top = `${clientY}px`;
    overlay.classList.add('expand');

    setTimeout(() => {
      window.location.href = href;
    }, 1000);

    setTimeout(() => {
      overlay.classList.remove('expand');
    }, 1500);
  };

  return (
    <div className="wrapper">
      {/* <div className="home-container">
        {isLoggedIn ? (
          <button className="btn" onClick={handleLogout}>로그아웃</button>
        ) : (
          <div className='start_btn'>
            <Link to="/login">
              <button className="btn">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="btn">회원가입</button>
            </Link>
          </div>
        )}
      </div> */}
      <div className="hero-container">
        <div className="hero">
          <h1 className="hero__heading">당신의 도전이 조금 더 쉬어지도록 </h1>
          <h3 className="hero__heading">리트리버가 당신의 도전을 보조할게요</h3>
          <a className="btn" href="#" onClick={(e) => handleClick(e, "#")} title="채팅 시작하기">채팅 시작하기</a>

          {isLoggedIn ? (
          <button className="btn" onClick={handleLogout}>로그아웃</button>
          ) : (
          <div>
            <Link to="/login">
              <button className="btn">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="btn">회원가입</button>
            </Link>
          </div>
          )}
        </div>
        <div className="hero hero--secondary" aria-hidden="true" data-hero ref={heroRef}>
          <p className="hero__heading">Welcome to Retriver</p>
          <a className="btn" href="/chatbot" onClick={(e) => handleClick(e, "/chat_")} title="채팅 시작하기">채팅 시작하기</a>
            
          {isLoggedIn ? (
          <button className="btn" onClick={handleLogout}>로그아웃</button>
          ) : (
          <div>
            <Link to="/login">
              <button className="btn">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="btn">회원가입</button>
            </Link>
          </div>
          )}
        </div>
      </div>
      <div ref={overlayRef} className="transition-overlay"></div>
      <footer>Developed by Aivle School team 14</footer>
    </div>
  );
};

export default HeroComponent;