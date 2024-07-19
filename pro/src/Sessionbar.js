import React from "react";
import RSidebar from "./components/rsidebar";

const Sessionbar = ({ sessions, onSessionClick, fetchSessions }) => {
  // 날짜별로 세션 그룹화
  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <RSidebar width={280} onRefresh={fetchSessions}>
      {sessions.length === 0 ? (
        <p>과거 대화기록이 없습니다.</p>   
      ) : (
        <ul style={styles.sessionList}>
          {Object.keys(groupedSessions).map((date) => (
            <React.Fragment key={date}>
              <li style={styles.dateHeader}>
                {parseInt(date.slice(5, 7))}월 {parseInt(date.slice(8, 10))}일
              </li>
              {groupedSessions[date].map((session) => (
                <li
                  key={session.id}
                  onClick={() => onSessionClick(session.id)}
                  style={styles.sessionItem}
                >
                  {session.title}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
    </RSidebar>
  );
};

// 날짜별로 세션 그룹화 함수
const groupSessionsByDate = (sessions) => {
  return sessions.reduce((acc, session) => {
    const date = session.time.slice(0, 10); // "YYYY-MM-DD" 형식으로 자르기
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {});
};

const styles = {
  sessionList: {
    listStyleType: "none",
    padding: 0,
  },
  dateHeader: {
    padding: "10px",
    margin: "5px 0",
    fontWeight: "bold",
    backgroundColor: "#dcdcdc",
    textAlign: "left",
  },
  sessionItem: {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
    textAlign: "left",
    transition: "background-color 0.3s",
  },
};

export default Sessionbar;