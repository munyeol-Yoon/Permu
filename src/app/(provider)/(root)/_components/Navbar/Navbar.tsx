import BasketSVG from '@@/public/header/basket.svg';
import MenubarSVG from '@@/public/header/header_menubar.svg';
import Logo from '@@/public/header/Logo.svg';
import PersonSVG from '@@/public/header/person.svg';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="px-[15px] h-[64px] justify-between flex items-center">
      <Link href="/category">
        <MenubarSVG className="w-6 h-6" />
      </Link>

      <Link href="/">
        <Logo className="w-[116px] h-[27px] ml-[46px]" />
      </Link>

      <div className="flex justify-between items-center">
        <Link href="/cart">
          <BasketSVG className="w-[28px] h-[28px] mr-[20px]" />
        </Link>

        <Link href="/mypage">
          <PersonSVG className="w-[28px] h-[28px]" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
