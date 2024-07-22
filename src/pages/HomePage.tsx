import React from 'react';
import Header from '@/components/common/header';
import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import Newsletter from '@/components/home/newsletter';
import Zigzag from '@/components/home/zigzag';

// 인터페이스 정의
interface HomePageProps {
  isLoggedIn: boolean;
  hasToken: boolean;
  handleLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, hasToken, handleLogout }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Hero />
      <Features />
      <Zigzag />
      <Newsletter />
    </>
  );
};

export default HomePage;
