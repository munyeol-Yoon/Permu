import Link from 'next/link';
import MenubarSVG from '@@/public/header/header_menubar.svg';
import Logo from '@@/public/header/Logo.svg';
import SearchSVG from '@@/public/header/search.svg';
import BasketSVG from '@@/public/header/basket.svg';

const Navbar = () => {
  return (
    <div className="px-[15px] h-[64px] justify-between flex items-center">
      <button>
        <MenubarSVG className="w-6 h-6" />
      </button>

      <Link href="/">
        <Logo className="w-[116px] h-[27px]" />
      </Link>

      <div className="flex justify-between items-center">
        <Link href="/search">
          <SearchSVG className="w-[28px] h-[28px] mr-[20px]" />
        </Link>

        <Link href="/cart">
          <BasketSVG className="w-[28px] h-[28px]" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
