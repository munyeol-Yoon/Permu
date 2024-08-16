'use client';

import SearchHeader from '@/components/SearchPage/SearchHeader';
import { cn } from '@/utils/cn';
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
    <div className="max-h-screen flex justify-center gap-[45px]">
      <Image src="/main_image.webp" fill priority alt="background" loading="eager" />
      <div className="flex-col justify-center gap-3 xl:flex hidden">
        <div className="relative w-[500px] h-[500px]">
          <Image src="/banner/main_banner.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
        <div className="relative w-[500px] h-[130px]">
          <Image src="/banner/main_event_banner_1.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
        <div className="relative w-[500px] h-[130px]">
          <Image src="/banner/main_event_banner_2.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
        <div className="relative w-[500px] h-[130px]">
          <Image src="/banner/main_event_banner_3.webp" fill alt="이벤트 이미지" className="object-contain absolute" />
        </div>
      </div>
      <div className="relative bg-white w-full max-w-[600px] h-full max-h-screen overflow-scroll flex flex-col">
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
