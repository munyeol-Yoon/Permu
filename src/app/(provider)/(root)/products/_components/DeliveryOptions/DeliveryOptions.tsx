'use client';

import ArrowBIcon from '@@/public/arrow/arrow-bottom.svg';
import ArrowRIcon from '@@/public/arrow/arrow-right.svg';
import { cx } from 'class-variance-authority';
import { useState } from 'react';
const DeliveryOptions = () => {
  const deliveryOptions = [
    '배송 상품 50,000원 이상 구매시 무료배송',
    '배송 상품 30,000원 이상 구매시 배송비 1,500원',
    '배송 상품 10,000원 이상 구매시 배송비 2,500원',
    '카카오 페이로 구매 시 무료배송',
    '토스 페이로 구매 시 무료배송'
  ];
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleOnOff = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <div className="box-container">
        <span className="text-[#B3B3B3] font-bold">상품 배송 옵션</span>
        {deliveryOptions.length > 3 && (
          <span className="flex-row-10 items-center  text-[#B3B3B3] hover:cursor-pointer" onClick={handleOnOff}>
            배송 혜택 모두 보기 {isExpanded ? <ArrowBIcon /> : <ArrowRIcon />}
          </span>
        )}
      </div>

      <div
        className={cx(
          'grid-col-3 gap-[10px] justify-between p-5-2 w-full overflow-hidden flex-wrap transition-all duration-500',
          { 'h-[120px]': !isExpanded, 'h-auto': isExpanded }
        )}
      >
        {deliveryOptions.map((deliveryOption, index) => (
          <div key={index} className="bg-gray-100 rounded-sm pt-[18px] pr-[14px] pb-[17px] pl-[15px]">
            <span className="font-bold text-[15px] leading-[22.5px]">{deliveryOption}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
