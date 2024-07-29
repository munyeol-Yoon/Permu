import LogoSVG from '@@/public/logo.svg';
import XSVG from '@@/public/x.svg';
import MenuItem from './MenuItem';
// TODO: 경로 논의 필요 @를 사용해야하지만 더 상위에 있는 폴더인점

const SearchHeader = () => {
  return (
    <>
      <header className="flex px-[20px] pl-[50px] justify-between items-center h-[64px]">
        <LogoSVG className="cursor-pointer" />
        <XSVG className="cursor-pointer" />
      </header>
      <section className="flex justify-start items-center self-stretch py-[0px] pr-[9px] pl-[50px] h-[64px]">
        <MenuItem>로그인</MenuItem>
        <MenuItem>|</MenuItem>
        <MenuItem>장바구니</MenuItem>
      </section>
    </>
  );
};

export default SearchHeader;
