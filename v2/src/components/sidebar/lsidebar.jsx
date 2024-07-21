// src/components/LSidebar.js
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/lsidebar.module.css";


const LSidebar = ({ width = 280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width - 16);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width - 16);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭 시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideChildren)) {
      await setX(width - 16);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [handleClose]);

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
        onClick={toggleMenu} // 클릭 이벤트 추가
      >
        <div className={styles.line}></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default LSidebar;