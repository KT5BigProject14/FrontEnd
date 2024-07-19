import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles/HeroComponent.css';
import GlobeDemo from './Aceternity_UI/backgroundGlobe';

const HeroComponent = ({ isLoggedIn, hasToken, handleLogout }) => {
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
    <div className="wrapper" ref={heroRef}>
      <GlobeDemo hasToken={hasToken} />
      <div className="overlay" ref={overlayRef}></div>
    </div>
  );
};

export default HeroComponent;
