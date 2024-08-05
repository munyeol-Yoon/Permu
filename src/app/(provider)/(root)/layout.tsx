'use client';

import SearchHeader from '@/components/SearchPage/SearchHeader';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Header from './_components/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith('/category');
  const isProductPage = pathname.startsWith('/products');
  const isHomePage = pathname === '/';

  return (
    <div className="w-screen h-screen container grid mx-auto">
      <div className="bg-white max-w-[600px] h-full border mx-auto flex flex-col">
        {isCategoryPage ? <SearchHeader /> : (isProductPage || isHomePage) && <Header />}
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
