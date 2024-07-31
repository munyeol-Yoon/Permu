'use client';

import TopBanner from '../TopBanner';
import Navbar from '../Navbar';
import NavCategories from '../NavCategories';

const Header = () => {
  return (
    <header>
      {/* 위 */}
      <TopBanner />
      {/* 중간 */}
      <Navbar />
      {/* 밑 임시.*/}
      <NavCategories />
    </header>
  );
};

export default Header;
