'use client';

import { AUTH_LOG_IN_PATHNAME, CART, HOME, MYPAGE } from '@/constant/pathname';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import LogoSVG from '@@/public/logo.svg';
import XSVG from '@@/public/x.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '../Loading';
import MenuItem from './MenuItem';

const SearchHeader = () => {
  const { data: loggedUser, isPending } = useAuthQuery();

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  if (isPending) return <Loading />;
  return (
    <>
      <header className="flex px-[20px] pl-[50px] justify-between items-center h-[64px] mt-[40px]">
        <Link href={HOME}>
          <LogoSVG className="cursor-pointer" />
        </Link>
        <button onClick={handleGoBack} className="mr-7">
          <XSVG className="cursor-pointer" />
        </button>
      </header>
      <section className="flex justify-start items-center self-stretch py-[20px] pr-[9px] pl-[50px] h-[64px]">
        <MenuItem>
          {!loggedUser ? <Link href={AUTH_LOG_IN_PATHNAME}>로그인</Link> : <Link href={MYPAGE}>마이페이지</Link>}
        </MenuItem>
        <MenuItem>|</MenuItem>
        <MenuItem>
          <Link href={CART}>장바구니</Link>
        </MenuItem>
      </section>
    </>
  );
};

export default SearchHeader;
