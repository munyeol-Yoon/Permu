import ArrowLSVG from '@@/public/arrow/pagination/arrow-left.svg';
import ArrowRSVG from '@@/public/arrow/pagination/arrow-right.svg';
import { cx } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import PageButton from './PageButton';
interface PaginationProps {
  maxPage: number;
  itemCountPerPage: number;
  pageCountPerPage: number;
  clickListener: (page: number) => void;
}

const Pagination = ({ maxPage, pageCountPerPage, clickListener }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(pageCountPerPage);

  const pages: number[] = Array.from({ length: maxPage + 1 }, (_, i) => i);

  useEffect(() => {
    if (maxPage < pageCountPerPage) {
      setEndPage(maxPage);
    }
  }, [maxPage, pageCountPerPage]);

  const leftPageClicked = (): void => {
    const getStartPage = startPage - pageCountPerPage > 1 ? startPage - pageCountPerPage : 1;
    const current = startPage - pageCountPerPage >= 1 ? currentPage - pageCountPerPage : startPage - 1;
    setCurrentPage(current);
    setStartPage(getStartPage);
    setEndPage(getStartPage + pageCountPerPage - 1);
    clickListener(current);
  };

  const rightPageClicked = (): void => {
    const getEndPage = endPage + pageCountPerPage < maxPage ? endPage + pageCountPerPage : maxPage;
    const current =
      endPage + pageCountPerPage < maxPage ? currentPage + pageCountPerPage : startPage + pageCountPerPage;
    setCurrentPage(current);
    setStartPage(startPage + pageCountPerPage);
    setEndPage(getEndPage);
    clickListener(current);
  };

  const pageNumberClicked = (page: number): void => {
    setCurrentPage(page);
    clickListener(page);
  };

  return (
    <div className="flex-row-10 justify-center">
      <button
        onClick={leftPageClicked}
        disabled={startPage === 1}
        className={cx('mr-[40px]', {
          'opacity-50': startPage === 1,
          '': startPage !== 1
        })}
      >
        <ArrowLSVG />
      </button>
      {pages.slice(startPage, endPage + 1).map((page, i) => (
        <PageButton key={i} page={page} currentPage={currentPage} clickListener={pageNumberClicked} />
      ))}
      <button
        onClick={rightPageClicked}
        disabled={endPage === maxPage}
        className={cx('ml-[40px]', {
          'opacity-50': endPage === maxPage,
          '': endPage !== maxPage
        })}
      >
        <ArrowRSVG />
      </button>
    </div>
  );
};

export default Pagination;
