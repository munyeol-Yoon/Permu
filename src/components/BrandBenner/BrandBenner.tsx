import BrandFilter from '@@/public/brandfillter.svg';
import { PropsWithChildren } from 'react';

const BrandBenner = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <BrandFilter className="w-full h-full" />
      <div className="absolute top-[2px] flex-row-10 justify-between p-5-2 w-full h-full">{children}</div>
    </div>
  );
};

export default BrandBenner;
