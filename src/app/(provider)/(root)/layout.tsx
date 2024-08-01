'use client';

import SearchHeader from '@/components/SearchPage/SearchHeader';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Header from './_components/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith('/category');

  return (
    <div className="w-screen h-screen container grid grid-cols-1 md:grid-cols-2">
      <div className="relative">
        {/* <Image src={EventBenner} width={400} height={800} alt="이벤트" className="absolute object-cover right-0" /> */}
      </div>

      <div className="bg-white max-w-[600px] h-full border flex flex-col md:w-full">
        {isCategoryPage ? <SearchHeader /> : <Header />}

        {children}
      </div>
    </div>
  );
};

export default RootLayout;
