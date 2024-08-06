import { CATEGORY_SEARCH_RESULT_PATHNAME } from '@/constant/pathname';
import Link from 'next/link';

interface RecentSearchProps {
  recentSearchTerms: string[];
  handleDeleteClick: (term: string) => void;
  handleClearAllTermsClick: () => void;
}

const RecentSearch = ({ recentSearchTerms, handleDeleteClick, handleClearAllTermsClick }: RecentSearchProps) => {
  return (
    <>
      <section className="flex justify-between items-center self-stretch h-[64px] px-[50px] py-0">
        <h2>최근 검색어</h2>
        <h2 onClick={handleClearAllTermsClick} className="text-gray-300 cursor-pointer">
          모두 삭제
        </h2>
      </section>
      {recentSearchTerms.length > 0 ? (
        <section className="flex flex-wrap justify-between items-center self-stretch h-[56px] px-[50px] py-0 gap-[8px]">
          <ul className="flex flex-wrap gap-[10px]">
            {recentSearchTerms.map((term, index) => (
              <li
                key={index}
                className="flex h-[32px] py-0 px-[16px] justify-center items-center gap-[10px] rounded-sm border border-gray-300 bg-white text-gray-400"
              >
                <Link href={`${CATEGORY_SEARCH_RESULT_PATHNAME}?query=${term}`}>
                  <span>{term}</span>
                </Link>
                <button onClick={() => handleDeleteClick(term)}>X</button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default RecentSearch;
