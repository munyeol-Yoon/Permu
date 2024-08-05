import NavCategories from './NavCategories';
import Navbar from './Navbar';
import TopBanner from './TopBanner';

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
