import { PropsWithChildren } from 'react';

const SearchPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <header>permeate</header>
      {children}
    </div>
  );
};

export default SearchPageLayout;
