import React from "react";
import LSidebar from "../components/sidebar/lsidebar";
import "../styles/Storagebar.css"


const Storagebar = ({ storages = [], onItemClick }) => {
  const groupedStorages = groupStoragesByDate(storages);

  return (
    <LSidebar width={280}>
      {storages.length === 0 ? (
        <p>과거 검색기록이 없습니다.</p>
      ) : (
        <div className="scrollable-content">
          <ul className='storagebarList'>
            {Object.keys(groupedStorages).map((date) => (
              <React.Fragment key={date}>
                <li className='storagebarDateHeader'>
                  {parseInt(date.slice(5, 7))}월 {parseInt(date.slice(8, 10))}일
                </li>
                {groupedStorages[date].map((session) => (
                  <li
                    className='storagebarItem'
                    key={session.docs_id}
                    onClick={() => onItemClick(session.docs_id)}
                  >
                    {session.title}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </LSidebar>
  );
};

// 날짜별로 storages 그룹화 함수
const groupStoragesByDate = (storages) => {
  return storages.reduce((acc, session) => {
    const date = session.time.slice(0, 10); // "YYYY-MM-DD" 형식으로 자르기
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {});
};


export default Storagebar;

