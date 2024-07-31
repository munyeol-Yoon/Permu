'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useOrderMutation } from '@/hooks/mutation';
import { useOrderInfoQuery } from '@/hooks/query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

const DeliveryPage = () => {
  const router = useRouter();

  const { loggedUser } = useAuth();
  const { data: orderInfo } = useOrderInfoQuery();
  const { mutateAsync } = useOrderMutation();

  const [selectedCoupon, setSelectedCoupon] = useState<{ discount: number } | null>(null);
  const [mileageAmount, setMileageAmount] = useState(0);

  const receiverMemoRef = useRef('');

  const totalPrice = useMemo(() => {
    const initialPrice = orderInfo?.productList.reduce((acc: number, cur: { price: number }) => acc + cur.price, 0);
    const couponPrice = selectedCoupon ? selectedCoupon.discount : 0;
    const finalPrice = initialPrice - couponPrice - mileageAmount;
    return finalPrice;
  }, [mileageAmount, orderInfo, selectedCoupon]);

  const handleOrder = async () => {
    const deliveryInfo = {
      userId: orderInfo.user.id,
      name: orderInfo.user.name,
      address: '서울시 목업구 더미동',
      phone: orderInfo.user.phone,
      deliverMemo: receiverMemoRef.current,
      arrivalDate: new Date()
    };
    const updatedMileageAmount = orderInfo.user.mileage - mileageAmount;
    await mutateAsync({ deliveryInfo, totalPrice, coupon: selectedCoupon, updatedMileageAmount });
    router.push('/order/complete');
  };

  return (
    <div className="relative max-w-[600px] pt-[60px] pb-[120px] w-full flex flex-col gap-5">
      <div>
        <div className="p-5 border-b-[0.5px]">
          <p className="text-xl font-bold">배송지</p>
        </div>
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-5">
            <div className="px-4 bg-[#0348FF] text-white text-sm py-1.5 rounded-full">배송지 1</div>
            <div className="px-4 text-sm py-1.5 rounded-full border border-[#B3B3B3]/50">배송지 2</div>
          </div>
          <p className="text-[#0348FF] font-bold text-sm">배송지 변경</p>
        </div>
        <div className="px-5">
          <p className="font-semibold mb-2.5">{loggedUser?.userData.name}</p>
          <p className="text-xs mb-3">{loggedUser?.userData.phone}</p>
          <p className="text-xs text-[#B3B3B3] mb-1.5">TODO: 배송지 정보 넣기</p>
          <Input
            placeholder="직접 입력하기"
            onChange={(e) => (receiverMemoRef.current = e.target.value)}
            className="border-b border-x-0 border-t-0 rounded-none placeholder:text-[B3B3B3] text-xs focus-visible:ring-0 mb-3"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center px-2.5 py-1.5 border border-[#B3B3B3] w-full text-start text-xs text-[#B3B3B3]">
              <p>TODO: 배송 시 요청사항 리스트 넣기</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem>부재 시 당근을 흔들어주세요.</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>부재 시 당근을 흔들어주세요.</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>부재 시 당근을 흔들어주세요.</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">상품정보</p>
        </div>
        <div className="flex flex-col gap-5">
          {orderInfo?.productList?.map((productItem: any) => (
            <div key={productItem.productId} className="flex items-center px-5">
              <div className="relative aspect-square max-w-[100px] h-[100px] mx-[33px]">
                <Image src={productItem.thumbNailURL} width={100} height={100} alt="" className="absolute" />
              </div>
              <div className="flex flex-col px-2.5 w-full">
                <p className="text-xs mb-1">{productItem.Brands.enName}</p>
                <p className="font-semibold mb-2.5">{productItem.title}</p>
                <p className="text-xs text-[#B3B3B3] mb-1.5">옵션 : 옵션 A / 옵션 a / 옵션 1</p>
                <p className="text-end font-bold">{productItem.price.toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">마일리지 사용</p>
        </div>
        <div className="flex flex-col text-xl px-5">
          <div className="flex justify-between items-center py-2.5">
            <p>보유</p>
            <p className="text-[#B3B3B3]">
              <span className="text-base pr-2">사용 가능한 마일리지 잔액</span>
              {loggedUser?.userData.mileage?.toLocaleString()}P
            </p>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <p>사용 금액</p>
            <div className="flex items-center gap-6">
              <Input className="max-w-[353px] h-9 py-1.5 text-xl font-bold text-[#0348FF] text-right" />
              <p className="font-bold">P</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">쿠폰 사용</p>
        </div>
        <div className="flex flex-col px-5">
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p>보유</p>
            <div className="text-xs px-5 py-1.5 bg-[#0348FF] text-white rounded-sm">사용 가능한 쿠폰 확인하기</div>
          </div>
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">결제 수단</p>
        </div>
        <div className="flex items-center px-5 gap-4">
          <Checkbox />
          <p>토스페이</p>
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">환불 방법</p>
        </div>
      </div>

      <div>
        <div className="p-5 border-b-[0.5px] mb-5">
          <p className="text-xl font-bold">최종 결제 금액</p>
        </div>
        <div className="flex flex-col px-5 mb-5">
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p>상품금액</p>
            <p className="font-medium">162,000원</p>
          </div>
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p>배송비</p>
            <p className="font-medium text-[#0348FF]">배송비 무료</p>
          </div>
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p>할인금액</p>
            <p className="font-medium text-[#0348FF]">
              <span className="text-base">SAVE</span> -7,000원
            </p>
          </div>
          <div className="flex justify-between items-center py-2.5 text-xl">
            <p className="font-bold">결제금액</p>
            <p className="font-medium">159,000원</p>
          </div>
        </div>
        <div className="flex justify-between items-center px-5">
          <p className="text-xs">주문 내용을 확인했으며 서비스 약관 및 결제에 동의합니다.</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
            <path d="M1 0.945312L8.99998 8.05642L17 0.945313" stroke="black" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>

      <div className="fixed bottom-0 h-[96px] flex flex-col items-center z-50 max-w-[598px] w-full bg-white shadow-[0px_-19px_5px_0px_rgba(0,0,0,0.00),0px_-12px_5px_0px_rgba(0,0,0,0.01),0px_-7px_4px_0px_rgba(0,0,0,0.05),0px_-3px_3px_0px_rgba(0,0,0,0.09),0px_-1px_2px_0px_rgba(0,0,0,0.10)]">
        <div className="py-3 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
            <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
          </svg>
        </div>
        <div className="flex justify-center items-center h-full">
          <button onClick={handleOrder} className="bg-[#0348FF] text-white px-5 py-[11.5px] rounded-sm">
            총 2개 | 123.000원 구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
