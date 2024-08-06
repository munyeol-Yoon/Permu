import HeaderNav from './_components/HeaderNav';
import NavCategories from './_components/NavCategories';

const Header = () => {
  return (
    <header className="bg-white">
      <HeaderNav />
      <NavCategories />
    </header>
  );
};

export default Header;
