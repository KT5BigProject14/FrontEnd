import Header from '@/components/common/header';
import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import Newsletter from '@/components/home/newsletter';
import Zigzag from '@/components/home/zigzag';

const HomePage = ({ isLoggedIn, hasToken, handleLogout }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Hero />
      <Features />
      {/* <Zigzag /> */}
      <Newsletter />
    </>
  );
};

export default HomePage;
