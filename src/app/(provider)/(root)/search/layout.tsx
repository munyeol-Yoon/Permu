import SearchHeader from '@/components/SearchPage/SearchHeader';
import { PropsWithChildren } from 'react';

const SearchPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <SearchHeader />
      {children}
    </div>
  );
};

export default SearchPageLayout;
