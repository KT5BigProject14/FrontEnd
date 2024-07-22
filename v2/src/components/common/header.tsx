import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileMenu from './mobile-menu';
import Logo from '@/assets/Logo-kt.png';
// import Logo from '@/assets/kt-logo.png';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

  // 버튼 클릭 시 역할 확인 및 리디렉션 로직
  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    const role = sessionStorage.getItem("role");
    console.log(role);
    if (role === "guest") {
      e.preventDefault();
      alert("정보를 입력해야 사용할 수 있습니다.");
      navigate("/info");
    } else {
      navigate(path);
    }
  };

  const isActive = (path: string) => location.pathname === path ? 'border-b-2 border-black' : '';

  return (
    <header className="absolute w-full z-30 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <a href="/" className="block" aria-label="Cruip">
              <img src={Logo} alt="Logo" className="w-12 h-12 fill-current" />
            </a>
          </div>
          {isLoggedIn ? (
            <>
              <div className={`shrink-0 mr-8 ${isActive('/')}`}>
                <a href="/" className="block" aria-label="Cruip">
                  <div className="text-black">Home</div>
                </a>
              </div>
              <div className={`shrink-0 mr-8 ${isActive('/chat_')}`}>
                <a href="/chat_" className="block" aria-label="Cruip" onClick={(e) => handleButtonClick(e, "/chat_")}>
                  <div className="text-black">Chat</div>
                </a>
              </div>
              <div className={`shrink-0 mr-8 ${isActive('/QnA')}`}>
                <a href="/QnA" className="block" aria-label="Cruip">
                  <div className="text-black">QnA</div>
                </a>
              </div>
              <div className={`shrink-0 mr-8 ${isActive('/profile')}`}>
                <a href="/profile" className="block" aria-label="Cruip">
                  <div className="text-black">My Page</div>
                </a>
              </div>
              <div className={`shrink-0 mr-8 ${isActive('/storage')}`}>
                <a href="/storage" className="block" aria-label="Cruip" onClick={(e) => handleButtonClick(e, "/storage")}>
                  <div className="text-black">Storage</div>
                </a>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              {isLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={handleLogoutAndRedirect}
                      className="font-medium btn-sm text-black bg-transparent hover:bg-slate-950 ml-3 hover:text-white"
                      style={{ borderRadius: '40px', border: '1px gray solid' }}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      href="/login"
                      className="font-medium btn-sm text-black bg-transparent hover:bg-slate-950 ml-3 hover:text-white"
                      style={{ borderRadius: '40px', border: '1px gray solid' }}>
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/signup"
                      className="btn-sm text-black bg-slate-200 hover:bg-slate-950 ml-3 hover:text-white"
                      style={{ borderRadius: '40px' }}>
                      Sign up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
