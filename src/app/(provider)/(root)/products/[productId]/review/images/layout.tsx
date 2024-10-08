import Navbar from '@/components/Navbar';
import { PropsWithChildren } from 'react';
const ReviewImagesLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="relative max-w-[600px] h-screen flex flex-col">
      <Navbar title="전체후기사진 모아보기" isHome />
      {children}
    </div>
  );
};

export default ReviewImagesLayout;
