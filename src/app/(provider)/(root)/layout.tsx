import { PropsWithChildren } from 'react';
import Header from './_components/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-screen container grid grid-cols-[1fr_600px]">
      이벤트 배너
      <div className="relative min-w-[600px] h-full border flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
