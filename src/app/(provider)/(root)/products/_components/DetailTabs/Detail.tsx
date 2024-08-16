'use client';
import ArrowBIcon from '@@/public/arrow/arrow-bold-bottom.svg';
import ArrowTIcon from '@@/public/arrow/arrow-top.svg';
import Image from 'next/image';
import { useState } from 'react';

const DetailPage = ({ productDetail }: { productDetail: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleOnOff = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <div className={`transition-all duration-500 ${!isExpanded ? 'max-h-[243px] overflow-hidden' : 'h-auto'}`}>
        <div className="relative w-full mb-5">
          <Image
            src={productDetail}
            alt={'상세 정보'}
            width={1000}
            height={1000}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full absolute bottom-0 left-0 flex items-center mb-5 justify-center bg-opacity-75">
        <button className="bg-white p-2-4 border" onClick={handleOnOff}>
          <span className="flex items-center">
            상품 정보 {!isExpanded ? <span>더보기 </span> : <span>접기 </span>}
            {!isExpanded ? <ArrowBIcon /> : <ArrowTIcon />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
