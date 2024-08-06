import { CART, CATEGORY, HOME, MYPAGE } from '@/constant/pathname';
import BasketSVG from '@@/public/header/basket.svg';
import MenubarSVG from '@@/public/header/header_menubar.svg';
import Logo from '@@/public/header/Logo.svg';
import PersonSVG from '@@/public/header/person.svg';
import Link from 'next/link';

const HeaderNav = () => {
  return (
    <div className="px-4 py-7 flex items-center">
      <div className="flex-1">
        <Link href={CATEGORY}>
          <MenubarSVG />
        </Link>
      </div>

      <div className="grow text-center">
        <Link href={HOME}>
          <Logo className="inline-block" />
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-x-5">
        <Link href={CART}>
          <BasketSVG />
        </Link>

        <Link href={MYPAGE}>
          <PersonSVG />
        </Link>
      </div>
    </div>
  );
};

export default HeaderNav;
