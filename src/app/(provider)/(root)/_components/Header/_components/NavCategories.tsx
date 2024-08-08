import { BRANDS, CATEGORY_SEARCH_RESULT_PATHNAME, EVENT } from '@/constant/pathname';
import useAlert from '@/hooks/useAlert';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { title: '추천' },
  { title: '특가' },
  { title: '전상품', url: CATEGORY_SEARCH_RESULT_PATHNAME },
  { title: '기획전' },
  { title: '이벤트', url: EVENT },
  { title: '브랜드관', url: BRANDS },
  { title: '고객센터' }
];

const NavCategories = () => {
  const [activeLink, setActiveLink] = useState<string>('');
  const { showInfoAlert } = useAlert();

  const handleClick = (title: string, url?: string) => {
    setActiveLink(title);
    if (!url) {
      showInfoAlert('준비중입니다');
    }
  };

  return (
    <ul className="mx-[30px] flex justify-between">
      {LINKS.map((nav) => {
        const isActive = activeLink === nav.title;
        return (
          <Link href={nav.url ?? ''} key={nav.title}>
            <li
              className={cn('cursor-pointer px-4 py-3 hover:brightness-90 active:brightness-110', {
                'border-b-2 border-black font-semibold': isActive,
                'text-muted': !isActive
              })}
              onClick={() => handleClick(nav.title, nav.url)}
            >
              <span>{nav.title}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default NavCategories;
