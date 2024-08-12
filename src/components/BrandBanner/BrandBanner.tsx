import BrandFilter from '@@/public/brandFilter.svg';
import { PropsWithChildren } from 'react';

const BrandBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative cursor-pointer hover:brightness-90 active:brightness-110 h-[80px]">
      <BrandFilter className="w-full h-full" />
      <div className="absolute top-0 flex-row-10 justify-between p-5-2 w-full h-full">{children}</div>
    </div>
  );
};

export default BrandBanner;
