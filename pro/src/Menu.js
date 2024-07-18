// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Menu = ({ isLoggedIn, handleLogout }) => {
//   const navigate = useNavigate();

//   const navStyle = {
//     ...styles.nav,
//     gap: isLoggedIn ? '200px' : '100px',
//   };

//   // 로그아웃 후 홈으로 리디렉션하는 로직
//   const handleLogoutAndRedirect = () => {
//     handleLogout();  // 기존 로그아웃 로직 실행
//     navigate('/');  // 홈 페이지로 리디렉션
//   };

//   // 버튼 클릭 시 역할 확인 및 리디렉션 로직
//   const handleButtonClick = (e, path) => {
//     const role =sessionStorage.getItem("role")
//     console.log(role);
//     if (role === "guest") {
//       e.preventDefault();
//       alert("정보를 입력해야 사용할 수 있습니다.");
//       navigate("/signup-next");
//     } else {
//       navigate(path);
//     }
//   };

//   return (
//     <header style={styles.header}>
//       <div style={styles.logo}>LOGO</div>
//       <nav style={navStyle}>
//         {isLoggedIn ? (
//           <>
//             <Link to="" style={styles.navItem}>Home</Link>
//             <Link to="/chat_" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/chat_")}>Chat</Link>
//             <Link to="/QnA" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/QnA")}>QnA</Link>
//             <Link to="/profile" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/profile")}>My Page</Link>
//             <Link to="/storage" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/storage")}>Storage</Link>
//             <button className="out-btn" onClick={handleLogoutAndRedirect} style={styles.logoutButton}>로그아웃</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" style={styles.navItem}>로그인</Link>
//             <Link to="/signup" style={styles.navItem}>회원가입</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// const styles = {
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#0077B6',
//     padding: '10px',
//     color: 'white',
//   },
//   logo: {
//     fontSize: '24px',
//   },
//   nav: {
//     display: 'flex',
//   },
//   navItem: {
//     color: 'white',
//     textDecoration: 'none',
//     margin: '0 15px',
//   },
//   logoutButton: {
//     backgroundColor: '#61dafb',
//     border: 'none',
//     padding: '5px 10px',
//     cursor: 'pointer',
//   },
// };

// export default Menu;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaComments, FaQuestionCircle, FaUser, FaBox, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Menu = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const navStyle = {
    ...styles.nav,
    justifyContent: 'center',
  };

  // 로그아웃 후 홈으로 리디렉션하는 로직
  const handleLogoutAndRedirect = () => {
    handleLogout();  // 기존 로그아웃 로직 실행
    navigate('/');  // 홈 페이지로 리디렉션
  };

  // 버튼 클릭 시 역할 확인 및 리디렉션 로직
  const handleButtonClick = (e, path) => {
    const role = sessionStorage.getItem("role");
    console.log(role);
    if (role === "guest") {
      e.preventDefault();
      alert("정보를 입력해야 사용할 수 있습니다.");
      navigate("/signup-next");
    } else {
      navigate(path);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>LOGO</div>
      <nav style={styles.nav}>
        {isLoggedIn ? (
          <>
            <div style={styles.navCenter}>
              <Link to="" style={styles.navItem}>
                <FaHome style={styles.icon} /> Home
              </Link>
              <Link to="/chat_" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/chat_")}>
                <FaComments style={styles.icon} /> Chat
              </Link>
              <Link to="/QnA" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/QnA")}>
                <FaQuestionCircle style={styles.icon} /> QnA
              </Link>
              <Link to="/profile" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/profile")}>
                <FaUser style={styles.icon} /> My Page
              </Link>
              <Link to="/storage" style={styles.navItem} onClick={(e) => handleButtonClick(e, "/storage")}>
                <FaBox style={styles.icon} /> Storage
              </Link>
            </div>
            <button className="out-btn" onClick={handleLogoutAndRedirect} style={styles.logoutButton}>
              <FaSignOutAlt style={styles.icon} /> 로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navItem}>
              <FaSignInAlt style={styles.icon} /> 로그인
            </Link>
            <Link to="/signup" style={styles.navItem}>
              <FaUserPlus style={styles.icon} /> 회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: '10px 20px',
    color: '#333',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    fontSize: '24px',
    fontFamily: "'Noto Sans KR', sans-serif",
    color: '#333',
    fontWeight: '700',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    justifyContent: 'center',
    flexGrow: 1,
  },
  navCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    gap: '30px',
  },
  navItem: {
    color: '#333',
    textDecoration: 'none',
    margin: '0 15px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: '700',
    marginLeft: 'auto',
  },
  icon: {
    marginRight: '8px',
  },
};

// Google Fonts 링크 추가
const GoogleFontsLink = () => (
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet" />
);

export { GoogleFontsLink, Menu };