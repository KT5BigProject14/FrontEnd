// src/Sessionbar.js
import React from "react";
import LSidebar from "./components/lsidebar";

// const groupStoragesByDate = (storages) => {
//   return storages.reduce((groupedStorages, storage) => {
//     const date = storage.date.split('T')[0]; // Assuming storage.date is an ISO string
//     if (!groupedStorages[date]) {
//       groupedStorages[date] = [];
//     }
//     groupedStorages[date].push(storage);
//     return groupedStorages;
//   }, {});
// };

const Storagebar = ({ storages = [], onItemClick }) => {
  // const groupedStorages = groupStoragesByDate(storages);

  return (
    <LSidebar width={280}>
      {/* {storages.length === 0 ? (
        <p>과거 검색기록이 없습니다.</p>
      ) : (
        <ul>
          {Object.keys(groupedStorages).map((date) => (
            <React.Fragment key={date}>
              <li style={styles.dateHeader}>
                {parseInt(date.slice(5, 7))}월 {parseInt(date.slice(8, 10))}일
              </li>
              {groupedStorages[date].map((session, index) => (
                <li
                  key={session.docs_id}
                  style={styles.storageItem}
                  onClick={() => onItemClick(session.docs_id)}
                >
                  {session.title}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )} */}
      <div className={styles.container}>
        {/* {Object.keys(groupedStorages).map((date) => (
          <div key={date} className={styles.dateGroup}>
            <h3>{date}</h3>
            <ul>
              {groupedStorages[date].map((storage) => (
                <li key={storage.id}>{storage.title}</li>
              ))}
            </ul>
          </div>
        ))} */}
     </div>
    </LSidebar>
  );
};

// 날짜별로 storages 그룹화 함수
// const groupStoragesByDate = (storages) => {
//   return storages.reduce((acc, session) => {
//     const date = session.time.slice(0, 10); // "YYYY-MM-DD" 형식으로 자르기
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(session);
//     return acc;
//   }, {});
// };

const styles = {
  storageList: {
    listStyleType: 'none',
    padding: 0,
  },
  dateHeader: {
    padding: '10px',
    margin: '5px 0',
    fontWeight: 'bold',
    backgroundColor: '#dcdcdc',
    textAlign: 'left',
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

export default Storagebar;