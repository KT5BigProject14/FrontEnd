import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/lsidebar.module.css";

const LSidebar = ({ width = 280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideChildren)) {
      await setX(width);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

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
      >
        <button onClick={toggleMenu} className={styles.button}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
            alt="toggle button"
            className={styles.toggleIcon}
          />
        </button>
        <div className={styles.content}>{children}Left : Storage</div>
      </div>
    </div>
  );
};

export default LSidebar;