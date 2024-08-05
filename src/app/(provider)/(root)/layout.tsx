'use client';

import SearchHeader from '@/components/SearchPage/SearchHeader';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import Header from './_components/Header';
import TopBanner from './_components/Header/_components/TopBanner';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith('/category');
  const isProductOrHomePage = pathname.startsWith('/products') || pathname === '/';

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="container mx-auto min-h-screen">
      <div className="bg-white w-full max-w-[600px] mx-auto flex flex-col">
        {isCategoryPage ? (
          <SearchHeader />
        ) : (
          isProductOrHomePage && (
            <>
              <div
                className={`
                duration-300 overflow-hidden
                ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-[50px] opacity-100'}
              `}
              >
                <TopBanner />
              </div>
              <div className="sticky top-0 z-10">
                <Header />
              </div>
            </>
          )
        )}
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
