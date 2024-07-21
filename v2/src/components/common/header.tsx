import { useNavigate } from 'react-router-dom';
import MobileMenu from './mobile-menu';
import Logo from '@/assets/Logo-kt.png';
// import Logo from '@/assets/kt-logo.png';

export default function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

    // 버튼 클릭 시 역할 확인 및 리디렉션 로직
  const handleButtonClick = (e, path) => {
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

  return (
    <header className="absolute w-full z-30 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <a href="/" className="block" aria-label="Cruip">
              <img src={Logo} alt="Logo" className="w-12 h-12 fill-current" />
              {/* <svg
                className="w-8 h-8 fill-current text-purple-600"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
              </svg> */}
            </a>
          </div>
          {isLoggedIn ? (
            <>
              <div className="shrink-0 mr-8">
                {/* Logo */}
                <a href="/" className="block " aria-label="Cruip">
                  <div className="text-black text-lg">Home</div>
                </a>
              </div>
              <div className="shrink-0 mr-8">
                <a href="/chat_" className="block " aria-label="Cruip" onClick={(e) => handleButtonClick(e, "/chat_")}>
                  <div className="text-black">Chat</div>
                </a>
              </div>
              <div className="shrink-0 mr-8">
                <a href="/QnA" className="block " aria-label="Cruip">
                  <div className="text-black">QnA</div>
                </a>
              </div>
              <div className="shrink-0 mr-8">
                <a href="/profile" className="block " aria-label="Cruip">
                  <div className="text-black">My Page</div>
                </a>
              </div>
              <div className="shrink-0 mr-8">
                <a href="/storage" className="block " aria-label="Cruip" onClick={(e) => handleButtonClick(e, "/chat_")}>
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
}
