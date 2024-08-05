'use client';

import SearchHeader from '@/components/SearchPage/SearchHeader';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Header from './_components/Header';
import TopBanner from './_components/Header/_components/TopBanner';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith('/category');
  const isProductPage = pathname.startsWith('/products');
  const isHomePage = pathname === '/';

  return (
    <div className="w-screen h-screen container grid mx-auto">
      <div className="bg-white max-w-[600px] min-w-[600px] h-full mx-auto flex flex-col">
        <TopBanner />
        <div className="sticky top-0 z-10">
          {isCategoryPage ? <SearchHeader /> : (isProductPage || isHomePage) && <Header />}
        </div>
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
