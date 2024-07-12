import React from "react";
import RSidebar from "./components/rsidebar";

const Sessionbar = ({ sessions, onSessionClick, fetchSessions }) => {
  return (
    <RSidebar width={280} onRefresh={fetchSessions}>
      {sessions.length === 0 ? (
        <p>과거 대화기록이 없습니다.</p>
      ) : (
        <ul style={styles.sessionList}>
          {sessions.map((session) => (
            <li
              key={session.id}
              onClick={() => onSessionClick(session.id)}
              style={styles.sessionItem}
            >
              {session.title}
            </li>
          ))}
        </ul>
      )}
    </RSidebar>
  );
};

const styles = {
  sessionList: {
    listStyleType: 'none',
    padding: 0,
  },
  sessionItem: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s',
  },
};

export default Sessionbar;