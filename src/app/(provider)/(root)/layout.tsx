'use client';

import SearchHeader from '@/components/SearchPage/SearchHeader';
import { cn } from '@/utils/cn';
import EventIMG from '@@/public/banner/event/eventIMG.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import Header from './_components/Header';
import TopBanner from './_components/Header/_components/TopBanner';
const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isReviewPage = pathname.endsWith('/images');
  const isCategoryPage = pathname.startsWith('/category');
  const isCategorySearchResultPage = pathname === '/category/search/result';
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
    <div className="lg:container min-h-screen grid lg:grid-cols-2">
      <Image src="/main_image.webp" fill priority unoptimized alt="" />
      <div className="hidden lg:block relative">
        <Image src={EventIMG} fill unoptimized alt="" className="object-contain lg:max-w-[500px] lg:max-h-[500px]" />
      </div>
      <div className="relative bg-white w-full max-w-[600px] h-full max-h-screen overflow-scroll mx-auto flex flex-col">
        {isReviewPage ? null : isCategoryPage && !isCategorySearchResultPage ? (
          <SearchHeader />
        ) : (
          (isProductOrHomePage || isCategorySearchResultPage) && (
            <>
              <div
                className={cn('transition-all duration-300', {
                  'max-h-0 opacity-0': isScrolled,
                  'max-h-[50px] opacity-100': !isScrolled
                })}
              >
                <TopBanner />
              </div>
              <div className="sticky top-0 z-40">
                <Header />
              </div>
            </>
          )
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
