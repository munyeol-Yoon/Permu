'use client';

import SearchHeader from '@/components/SearchPage/SearchHeader';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Header from './_components/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith('/category');

  return (
    <div className="h-screen w-screen container grid grid-cols-[1fr_600px]">
      이벤트 배너
      <div className="relative min-w-[600px] h-full border flex flex-col">
        {isCategoryPage ? <SearchHeader /> : <Header />}
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
