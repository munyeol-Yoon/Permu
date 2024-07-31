'use client';
import ArrowBIcon from '@@/public/arrow/arrow-bold-bottom.svg';
import Image from 'next/image';
import { useState } from 'react';
const DetailPage = ({ productDetail }: { productDetail: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleOnOff = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <div className={`overflow-hidden transition-all duration-500 ${!isExpanded && 'h-[200px]'}`}>
        <div className="relative aspect-square">
          <Image src={productDetail} alt={'상세 정보'} fill className="object-cover" />
        </div>
      </div>

      {!isExpanded && (
        <div className="w-full absolute bottom-2 left-auto right-auto flex items-center justify-center">
          <button className="bg-white py-2 px-4 border" onClick={handleOnOff}>
            <span className="flex-row-10">
              상품 정보 더보기 <ArrowBIcon />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
