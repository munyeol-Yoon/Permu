import { PropsWithChildren } from 'react';

const MyPageLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-screen">{children}</div>;
};

export default MyPageLayout;
