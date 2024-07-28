import LogoSVG from '@@/public/logo.svg';
import { PropsWithChildren } from 'react';
// TODO: 경로 논의 필요 @를 사용해야하지만 더 상위에 있는 폴더인점

const SearchPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <header>
        <LogoSVG />
      </header>
      {children}
    </div>
  );
};

export default SearchPageLayout;
