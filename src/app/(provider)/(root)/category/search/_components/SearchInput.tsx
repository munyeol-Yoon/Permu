import { CATEGORY_SEARCH_RESULT_PATHNAME } from '@/constant/pathname';
import SearchButtonSVG from '@@/public/searchButton.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ForwardedRef, forwardRef } from 'react';

interface SearchInputProps {
  search: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: () => void;
  handleClearClick: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ search, handleInputChange, handleSearchClick, handleClearClick }, ref: ForwardedRef<HTMLInputElement>) => {
    const router = useRouter();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && search) {
        handleSearchClick();
        router.push(`${CATEGORY_SEARCH_RESULT_PATHNAME}?query=${search}`);
      }
    };

    return (
      <div className="relative w-full ml-11 mr-11">
        <input
          type="text"
          placeholder="여름 시즌 추천템 20% 할인"
          className="rounded-[4px] bg-[#b3b3b320] w-full px-2.5 py-0 pr-[60px] h-[64px]"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          ref={ref}
          value={search}
        />
        {search && (
          <button
            onClick={handleClearClick}
            className="absolute right-[50px] top-1/2 transform -translate-y-1/2 px-2.5 py-1 rounded-full w-6 h-6 text-white bg-gray-400 flex items-center justify-center"
          >
            X
          </button>
        )}
        <Link href={`${CATEGORY_SEARCH_RESULT_PATHNAME}?query=${search}`}>
          <button onClick={handleSearchClick} className="absolute right-0 top-0 bottom-0 px-3 py-1">
            <SearchButtonSVG />
          </button>
        </Link>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
