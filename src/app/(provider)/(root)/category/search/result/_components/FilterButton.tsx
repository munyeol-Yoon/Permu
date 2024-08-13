import { PropsWithChildren } from 'react';

const FilterButton = ({
  children,
  className,
  onClick
}: PropsWithChildren<{ className?: string; onClick?: () => void }>) => {
  return (
    <button
      className={`flex flex-1 justify-center items-center px-4 py-2 rounded-md h-[46px] text-[15px] whitespace-nowrap ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FilterButton;
