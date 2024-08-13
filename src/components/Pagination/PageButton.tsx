import { cx } from 'class-variance-authority';

interface NumberingProps {
  page: number;
  currentPage: number;
  clickListener: (page: number) => void;
}
const PageButton = ({ page, currentPage, clickListener }: NumberingProps) => {
  return (
    <button
      onClick={() => clickListener(page)}
      className={cx('font-normal', {
        'text-black': page === currentPage,
        'text-gray-500': page !== currentPage
      })}
    >
      {page}
    </button>
  );
};

export default PageButton;
