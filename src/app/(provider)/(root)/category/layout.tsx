import { PropsWithChildren } from 'react';

const CategoryPageLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-screen">{children}</div>;
};

export default CategoryPageLayout;
