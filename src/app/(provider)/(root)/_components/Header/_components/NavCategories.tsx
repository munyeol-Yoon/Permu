import useAlert from '@/hooks/useAlert';
import { useState } from 'react';

const LINKS = [
  { title: '추천' },
  { title: '특가' },
  { title: '전상품' },
  { title: '기획전' },
  { title: '이벤트' },
  { title: '브랜드관' },
  { title: '고객센터' }
];

const NavCategories = () => {
  const [activeLink, setActiveLink] = useState<string>('');
  const { showInfoAlert } = useAlert();
  const handleClick = (title: string) => {
    setActiveLink(title);
    showInfoAlert('준비중입니다');
  };

  return (
    <ul className="mx-[30px] flex justify-between">
      {LINKS.map((nav) => (
        <li key={nav.title} className="cursor-pointer px-4 py-3" onClick={() => handleClick(nav.title)}>
          <span className={`pb-3 ${activeLink === nav.title ? 'border-b-2 border-black font-semibold' : 'text-muted'}`}>
            {nav.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default NavCategories;
