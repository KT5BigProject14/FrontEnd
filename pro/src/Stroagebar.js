// src/Sessionbar.js
import React from "react";
import LSidebar from "./components/lsidebar";

const Stroagebar = ({ stroages, onItemClick }) => {
  return (
    <LSidebar width={280}>
      {stroages.length === 0 ? (
        <p>과거 검색기록이 없습니다.</p>
      ) : (
        <ul>
          {stroages.map((session, index) => (
            <li key={index} style={styles.storageItem} onClick={() => onItemClick(session.docs_id)}>
            {session.title}
            </li>
          ))}
        </ul>
      )}
    </LSidebar>
  );
};

const styles = {
  storageList: {
    listStyleType: 'none',
    padding: 0,
  },
  storageItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    color: '#000000',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    marginBottom: '5px',
    textAlign: 'left',
  },
};

export default Stroagebar;