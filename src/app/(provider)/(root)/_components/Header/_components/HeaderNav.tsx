'use client';

import { CART, CATEGORY, HOME, MYPAGE } from '@/constant/pathname';
import Arrow from '@@/public/arrow/arrow-left.svg';
import BasketSVG from '@@/public/header/basket.svg';
import MenubarSVG from '@@/public/header/header_menubar.svg';
import Logo from '@@/public/header/Logo.svg';
import PersonSVG from '@@/public/header/person.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderNavProps {
  isBackBtn?: boolean;
}

const HeaderNav = ({ isBackBtn = false }: HeaderNavProps) => {
  const router = useRouter();
  const handleBackBtn = () => router.back();

  return (
    <div className="px-4 py-7 flex items-center bg-white">
      <div className="flex-1">
        {isBackBtn ? (
          <Arrow onClick={handleBackBtn} className="cursor-pointer" />
        ) : (
          <Link href={CATEGORY}>
            <MenubarSVG />
          </Link>
        )}
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
