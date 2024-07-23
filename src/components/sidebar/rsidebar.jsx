import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "../../styles/rsidebar.module.css";


const RSidebar = ({ width = 280, children, onRefresh }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width + 16);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
      onRefresh(); // Call onRefresh when sidebar is opened
    } else {
      setX(-width + 16);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = useCallback(async (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideChildren)) {
      await setX(-width + 16);
      await setOpen(false);
    }
  }, [isOpen, width]);

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [handleClose]);

  // 세션 클릭 이벤트 처리 함수
  const handleSessionItemClick = (e) => {
    const sessionId = e.target.getAttribute('data-session-id');
    if (sessionId) {
      onRefresh();  // 부모 컴포넌트의 fetchSessions 함수를 호출
    }
  };

  // 여러 함수를 호출하는 핸들러
  const handleClick = (e) => {
    toggleMenu();
    handleSessionItemClick(e);
  };

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
        onClick={handleClick} // 클릭 이벤트 추가
      >
        <div className={styles.line}></div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};


export default RSidebar;