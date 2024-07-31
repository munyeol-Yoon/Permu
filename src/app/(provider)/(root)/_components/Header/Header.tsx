'use client';

import Link from 'next/link';
import MenubarSVG from '@@/public/header/header_menubar.svg';
import Logo from '@@/public/header/Logo.svg';
import SearchSVG from '@@/public/header/search.svg';
import BasketSVG from '@@/public/header/basket.svg';
import CloseSVG from '@@/public/header/close.svg';

const Header = () => {
  return (
    <header>
      {/* 위 */}
      <div className="w-full h-[38px] flex justify-center items-center bg-black relative">
        <p>
          <span className="font-light text-[14px] text-white">카카오톡 친구 추가시</span>
          <b className="font-bold text-[14px] text-white mx-[5px]">10% 할인 쿠폰</b>
          <span className="font-light text-[14px] text-white">즉시발급</span>
        </p>

        <button>
          <CloseSVG className="w-[16px] h-[16px] absolute top-[10px] right-5" />
        </button>
      </div>
      {/* 중간 */}
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
      {/* 밑 임시.*/}
      <div className="border-b">
        <ul className="flex space-x-8 p-4 justify-between">
          <li className="border-b-2 border-black">
            <Link href="#" className="text-black">
              추천
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              특가
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              전상품
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              기획전
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              이벤트
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              브랜드관
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              고객센터
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
