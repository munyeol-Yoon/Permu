'use client';

import { cn } from '@/utils/cn';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import HeaderNav from '../_components/Header/_components/HeaderNav';
import TopBanner from '../_components/Header/_components/TopBanner';

const RootLayout = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div
        className={cn('transition-all duration-300 overflow-hidden', {
          'max-h-0 opacity-0': isScrolled,
          'max-h-[50px] opacity-100': !isScrolled
        })}
      >
        <TopBanner />
      </div>
      <div className="sticky top-0 z-10">
        <HeaderNav isBackBtn />
      </div>
      {children}
    </>
  );
};

export default RootLayout;
