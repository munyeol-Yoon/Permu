'use client';

import { kakaoPayment, tossPayment } from '@/api/payment';
import Navbar from '@/components/Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
import useCart from '@/hooks/useCart';
import { cn } from '@/utils/cn';

import { MYPAGE_ADDRESS_EDIT_PATHNAME } from '@/constant/pathname';
import useAddressQuery from '@/hooks/query/useAddressQuery';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { OrderCompleted, OrderError, OrderLoading } from './_components';

const DeliveryPage = () => {
  const router = useRouter();

  const { loggedUser } = useAuth();
  const { data: orderInfo } = useOrderInfoQuery();
  const { mutateAsync } = useOrderMutation();
  const { deleteCartItem } = useCart();
  const { data: addressList, isFetched } = useAddressQuery();

  const [selectedCoupon, setSelectedCoupon] = useState<null | any>(null);
  const [selectedPayment, setSelectedPayment] = useState<'TOSS' | 'KAKAOPAY'>('KAKAOPAY');
  const [selectedAddress, setSelectedAddress] = useState<Tables<'Addresses'> | null>(null);
  const [mileageAmount, setMileageAmount] = useState(0);
  const [orderStatus, setOrderStatus] = useState<'IDLE' | 'PENDING' | 'COMPLETED' | 'FAILED'>('IDLE');

  const receiverMemoRef = useRef('');

  const totalProductDiscountPrice = useMemo(
    () =>
      orderInfo?.productList.reduce(
        (acc: number, cur: { price: number; discountedPrice: number }) => acc + cur.price - cur.discountedPrice,
        0
      ),
    [orderInfo]
  );

  const totalDiscountedPrice = useMemo(() => {
    const productDiscountPrice = totalProductDiscountPrice;
    const couponDiscount = selectedCoupon ? selectedCoupon.discount : 0;
    const finalDiscountedPrice = productDiscountPrice + couponDiscount + mileageAmount;
    return finalDiscountedPrice;
  }, [mileageAmount, selectedCoupon, totalProductDiscountPrice]);

  const totalProductPrice = useMemo(() => {
    const productPrice = orderInfo?.productList.reduce((acc: number, cur: { price: number }) => acc + cur.price, 0);
    return productPrice ?? 0;
  }, [orderInfo]);

  const totalPaymentPrice = useMemo(() => {
    const initialPrice = orderInfo?.productList.reduce(
      (acc: number, cur: { discountedPrice: number }) => acc + cur.discountedPrice,
      0
    );
    const couponPrice = selectedCoupon ? selectedCoupon.discount : 0;
    const finalPrice = initialPrice - couponPrice - mileageAmount;
    return finalPrice;
  }, [mileageAmount, orderInfo, selectedCoupon]);

  const handleChangeMileageAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > loggedUser!.userData!.mileage!) return;
    const validInputValue = e.target.value.replace(/[^0-9]/g, '');

    setMileageAmount(Number(validInputValue));
  };

  const handleSelectPayment = (payment: 'TOSS' | 'KAKAOPAY') => {
    setSelectedPayment(payment);
  };

  const handleSelectCoupon = (coupon: any) => {
    if (selectedCoupon === coupon) return setSelectedCoupon(null);

    setSelectedCoupon(coupon);
  };

  const handleOrder = async () => {
    setOrderStatus('PENDING');
    let response;
    const orderName =
      orderInfo.productList.length > 1
        ? `${orderInfo.productList[0].title} 외 ${orderInfo.productList.length - 1}건`
        : orderInfo.productList[0].title;
    switch (selectedPayment) {
      case 'TOSS':
        const tossResponse = await tossPayment(orderName, totalPaymentPrice);
        response = tossResponse;
        if (response?.code != null) {
          alert(response.message);
          setOrderStatus('FAILED');
          return;
        }
        break;
      case 'KAKAOPAY':
        const kakaoResponse = await kakaoPayment(orderName, totalPaymentPrice);
        response = kakaoResponse;
        if (response?.code != null) {
          alert(response.message);
          setOrderStatus('FAILED');
          return;
        }
        break;
    }

    const deliveryInfo = {
      name: orderInfo.user.name,
      addressId: selectedAddress?.addressId!,
      phone: orderInfo.user.phone,
      deliverMemo: receiverMemoRef.current,
      arrivalDate: new Date()
    };

    const updatedMileageAmount = orderInfo.user.mileage - mileageAmount;

    const mutateResponse = await mutateAsync({
      orderId: response?.paymentId!,
      deliveryInfo,
      totalPrice: totalPaymentPrice,
      couponId: selectedCoupon?.couponId,
      updatedMileageAmount,
      payment: selectedPayment
    });

    if (!mutateResponse.ok) {
      return setOrderStatus('FAILED');
    }

    await Promise.all(
      orderInfo?.productList.map((productItem: any) => deleteCartItem(productItem.productId, loggedUser!.id))
    );
    setOrderStatus('COMPLETED');
  };

  useEffect(() => {
    if (isFetched && addressList?.length) {
      setSelectedAddress(addressList[0]);
    }
  }, [addressList, isFetched]);

  if (orderStatus === 'IDLE') {
    return (
      <>
        <Navbar title="배송지" isHome />
        <div className="relative max-w-[600px] pt-[60px] pb-[120px] w-full flex flex-col gap-5">
          <div>
            <div className="p-5 border-b-[0.5px]">
              <p className="text-xl font-bold">배송지</p>
            </div>
            <div className="flex justify-between items-center px-5 py-4">
              <div className="flex items-center gap-5">
                {addressList?.map((addressItem) => (
                  <button
                    onClick={() => setSelectedAddress(addressItem)}
                    key={addressItem.addressId}
                    className={cn(
                      selectedAddress === addressItem
                        ? 'bg-[#0348FF] text-white border-[#FFFFFF]/50'
                        : 'bg-white text-[#302A28] border-[#B3B3B3]/50',
                      'px-4 text-sm py-1.5 rounded-full border transition-all'
                    )}
                  >
                    {addressItem.name}
                  </button>
                ))}
              </div>
              <Link href={MYPAGE_ADDRESS_EDIT_PATHNAME} className="text-[#0348FF] font-bold text-sm">
                배송지 변경
              </Link>
            </div>
            <div className="px-5">
              <p className="font-semibold mb-2.5">{selectedAddress?.name}</p>
              <p className="text-xs mb-3">{selectedAddress?.phone}</p>
              <p className="text-xs text-[#B3B3B3] mb-1.5">
                {selectedAddress?.address} {selectedAddress?.detailAddress}
              </p>
              <Input
                placeholder="직접 입력하기"
                onChange={(e) => (receiverMemoRef.current = e.target.value)}
                className="border-b border-x-0 border-t-0 rounded-none placeholder:text-[B3B3B3] text-xs focus-visible:ring-0 mb-3"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-between items-center px-2.5 py-1.5 border border-[#B3B3B3] w-full text-start text-xs text-[#B3B3B3]">
                  <p>배송시 요청사항을 선택해주세요.</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                    <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem>부재시 옥상으로 따라오세요.</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>문 앞에 놓아주세요.</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>부재시 당근을 흔들어주세요.</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>부재시 경비실에 맡겨주세요.</DropdownMenuCheckboxItem>
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
                  <div className="relative aspect-square max-w-[100px] mx-[33px]">
                    <Image src={productItem.thumbNailURL} width={100} height={100} alt="" />
                  </div>

                  <div className="flex flex-col px-2.5 w-full">
                    <p className="text-xs mb-1">{productItem.Brands.enName}</p>
                    <p className="font-semibold mb-2.5">{productItem.title}</p>
                    <p className="text-xs text-[#B3B3B3] mb-1.5">옵션 : 옵션 A / 옵션 a / 옵션 1</p>
                    <div className="relative flex justify-end items-center gap-[18px]">
                      {!!productItem.discount && (
                        <>
                          <p className="absolute -top-4 right-0 text-xs text-[#B3B3B3] line-through">
                            {productItem.price.toLocaleString()}원
                          </p>
                          <p className="text-[10px] text-[#0348FF]">SALE {productItem.discount}%</p>
                        </>
                      )}
                      <p className="font-bold">
                        {productItem.discountedPrice
                          ? productItem.discountedPrice.toLocaleString()
                          : productItem.price.toLocaleString()}
                        원
                      </p>
                    </div>
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
                  <Input
                    value={mileageAmount}
                    onChange={handleChangeMileageAmount}
                    className="max-w-[353px] h-9 py-1.5 text-xl font-bold text-[#0348FF] text-right"
                  />
                  <p className="font-bold">P</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="p-5 border-b-[0.5px] mb-5">
              <p className="text-xl font-bold">쿠폰 사용</p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="coupon_list" className="border-none">
                <div className="flex justify-between items-center py-2.5 text-xl px-5 data-[state=open]:hidden mb-5">
                  <p>보유</p>
                  <AccordionTrigger
                    withChevron={false}
                    className="text-xs px-5 py-1.5 bg-[#0348FF] text-white rounded-sm"
                  >
                    사용 가능한 쿠폰 확인하기
                  </AccordionTrigger>
                </div>
                <AccordionContent className="bg-[#D9D9D9] py-[30px] flex flex-col gap-3.5">
                  {orderInfo?.coupon.map((couponItem: any) => {
                    const formattedIssueDate = dayjs(couponItem.issueDate).format('YYYY-MM-DD');
                    const formattedExpirationDate = dayjs(couponItem.expirationDate).format('YYYY-MM-DD');
                    if (couponItem.orderStatus === 'active')
                      return (
                        <div
                          key={couponItem.couponId}
                          onClick={() => handleSelectCoupon(couponItem)}
                          className={cn(
                            'px-10 py-[26px] rounded-sm shadow-[140px_52px_42px_0px_rgba(0,0,0,0.00),90px_34px_38px_0px_rgba(0,0,0,0.01),50px_19px_32px_0px_rgba(0,0,0,0.03),22px_8px_24px_0px_rgba(0,0,0,0.04),6px_2px_13px_0px_rgba(0,0,0,0.05)] transition-all',
                            couponItem === selectedCoupon ? 'bg-[#0348FF] text-white' : 'bg-white text-black'
                          )}
                        >
                          <p className="pb-2.5 text-base font-semibold">{couponItem.name}</p>
                          <p
                            className={cn(
                              'pb-2 text-xs',
                              couponItem === selectedCoupon ? 'text-white' : 'text-[#B3B3B3]'
                            )}
                          >
                            {formattedIssueDate} - {formattedExpirationDate}
                          </p>
                          <p
                            className={cn(
                              'pb-2 text-[20px] font-bold',
                              couponItem === selectedCoupon ? 'text-white' : 'text-[#0348FF]'
                            )}
                          >
                            {couponItem.discount.toLocaleString()}원
                          </p>
                          <div className="flex justify-between items-center">
                            <p
                              className={cn('text-xs', couponItem === selectedCoupon ? 'text-white' : 'text-[#0348FF]')}
                            >
                              -{couponItem.discount.toLocaleString()}원 할인 혜택
                            </p>
                            <button
                              className={cn(
                                'text-xs py-1.5 px-2.5 rounded-sm',
                                couponItem === selectedCoupon ? 'bg-white text-[#0348FF]' : 'bg-[#0348FF] text-white'
                              )}
                            >
                              적용하기
                            </button>
                          </div>
                        </div>
                      );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <div className="p-5 border-b-[0.5px]">
              <p className="text-xl font-bold">결제 수단</p>
            </div>
            <div
              onClick={() => handleSelectPayment('KAKAOPAY')}
              className="flex items-center gap-4 p-5 text-[20px] cursor-pointer"
            >
              <Checkbox
                checked={selectedPayment === 'KAKAOPAY'}
                className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white data-[state=checked]:border-none"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="61" height="24" viewBox="0 0 61 24" fill="none">
                <g clipPath="url(#clip0_632_2533)">
                  <path
                    d="M48.6842 23.8338H12.1705C5.44866 23.8338 0 18.5365 0 12.0004C0 5.46533 5.44866 0.167969 12.1705 0.167969H48.6842C55.406 0.167969 60.8557 5.46533 60.8557 12.0004C60.8557 18.5365 55.406 23.8338 48.6842 23.8338Z"
                    fill="#FFE000"
                  />
                  <path
                    d="M15.7304 5.78906C12.0611 5.78906 9.08789 8.07352 9.08789 10.8913C9.08789 12.5819 10.1618 14.0784 11.8106 15.0072L11.029 17.8469C10.9539 18.1193 11.2659 18.3363 11.507 18.1788L14.8997 15.9517C15.1721 15.9778 15.4486 15.9935 15.7304 15.9935C19.3997 15.9935 22.3729 13.7089 22.3729 10.8913C22.3729 8.07345 19.3997 5.78906 15.7304 5.78906ZM28.6357 8.46425V13.4767C28.761 13.4923 29.0772 13.5226 29.3767 13.5226C31.0162 13.5226 31.6466 12.4038 31.6466 10.6412C31.6466 9.0925 31.2218 8.15738 29.9131 8.15738C29.4874 8.15738 29.0146 8.28052 28.6357 8.46425ZM28.6357 15.04V18.1823H26.3346V6.59409H27.9574L28.2413 7.32986C28.7307 6.85497 29.4706 6.34884 30.6697 6.34884C32.9239 6.34884 33.9967 7.98935 33.98 10.6412C33.98 13.4151 32.3249 15.1934 29.9601 15.1934C29.503 15.1934 29.1565 15.1621 28.6357 15.04ZM40.167 12.8177V11.2847H39.1108C37.9274 11.2847 37.3283 11.699 37.3283 12.5266C37.3283 13.1548 37.6602 13.4616 38.3375 13.4616C38.9689 13.4616 39.7736 13.1548 40.167 12.8177ZM38.8582 9.85911H40.167V9.58364C40.167 8.66312 39.6316 8.23422 38.7007 8.23422C37.9911 8.23422 37.0768 8.43356 36.3359 8.78626L35.7045 7.28348C36.5248 6.73246 37.7865 6.34947 38.9053 6.34947C41.1125 6.34947 42.3116 7.48283 42.3116 9.64415V14.9634H40.6877L40.4508 14.2579C39.521 14.9174 38.6694 15.193 37.8971 15.193C36.2096 15.193 35.2641 14.212 35.2641 12.5569C35.2641 10.7941 36.5247 9.85911 38.8582 9.85911ZM49.0719 14.105C48.2683 16.1901 47.3062 17.7076 45.9036 18.5498L44.4842 17.2776C45.3045 16.5878 45.8868 15.9136 46.392 15.0098L43.3331 6.90096L45.6186 6.303L47.5744 12.8787L49.5134 6.27271L51.7686 6.88526L49.0719 14.105Z"
                    fill="#302A28"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_632_2533">
                    <rect width="60.8558" height="23.6658" fill="white" transform="translate(0 0.167969)" />
                  </clipPath>
                </defs>
              </svg>
              <p>카카오페이</p>
            </div>
            <div
              onClick={() => handleSelectPayment('TOSS')}
              className="flex items-center gap-4 p-5 text-[20px] cursor-pointer"
            >
              <Checkbox
                checked={selectedPayment === 'TOSS'}
                className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white data-[state=checked]:border-none transition-colors"
              />
              <Image src="/toss.png" width={59} height={25} alt="" unoptimized />
              <p>토스페이</p>
            </div>
            <div className="flex items-center p-5 gap-4 text-[20px] cursor-pointer">
              <Checkbox className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white data-[state=checked]:border-none" />
              <p>카드 일반 결제</p>
            </div>
            <div className="flex items-center gap-4 p-5 text-[20px] cursor-pointer">
              <Checkbox className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white data-[state=checked]:border-none" />
              <p>무통장 입금</p>
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="refund" className="border-b-[0.5px]">
              <AccordionTrigger
                withChevron={false}
                className="flex justify-between p-5 [&[data-state=open]>svg]:rotate-0"
              >
                <p className="text-xl font-bold">환불 방법</p>
                <svg
                  className="rotate-180 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="9"
                  viewBox="0 0 18 9"
                  fill="none"
                >
                  <path d="M17 8.05469L9.00002 0.943577L1 8.05469" stroke="#302A28" strokeMiterlimit="10" />
                </svg>
              </AccordionTrigger>
              <AccordionContent className="text-[10px] bg-[#B3B3B3] p-6">
                <p>선택하신 결제 방법으로 환불해 드립니다.</p>
                <ul className="list-disc list-inside">
                  <li>
                    입점업체 배송은 낮은 확률로 상품이 품절일 가능성이 있습니다. 이에 품절 시 빠르게 환불
                    처리해드립니다.
                  </li>
                  <li>
                    현금 환불의 경우, 예금정보가 일치해야 환불 처리가 가능합니다. 은행명, 계좌번호, 예금주명을 정확히
                    기재 부탁드립니다.
                  </li>
                  <li>
                    환불받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불 처리됩니다.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <div className="p-5 border-b-[0.5px] mb-5">
              <p className="text-xl font-bold">최종 결제 금액</p>
            </div>
            <div className="flex flex-col px-5 mb-5">
              <div className="flex justify-between items-center py-2.5 text-xl">
                <p>상품금액</p>
                <p className="font-medium">{totalProductPrice.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between items-center py-2.5 text-xl">
                <p>배송비</p>
                <p className="font-medium text-[#0348FF]">배송비 무료</p>
              </div>
              <div className="flex flex-col py-2.5 text-xl">
                <div className="flex justify-between items-center py-5">
                  <p>할인금액</p>
                  <p className="font-medium text-[#0348FF]">
                    <span className="text-base">SAVE</span> -{totalDiscountedPrice.toLocaleString()}원
                  </p>
                </div>
                <div className="text-xs flex items-center justify-between px-[30px] py-4">
                  <p>쿠폰 할인금액</p>
                  <p>-{selectedCoupon ? selectedCoupon.discount.toLocaleString() : 0}원</p>
                </div>
                {totalProductDiscountPrice && (
                  <div className="text-xs flex items-center justify-between px-[30px] py-4">
                    <p>행사 할인금액</p>
                    <p>-{totalProductDiscountPrice.toLocaleString()}원</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between py-2.5 text-xl">
                <p className="font-bold">결제금액</p>
                <p className="font-medium">{totalPaymentPrice.toLocaleString()}원</p>
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
            <div className="flex justify-center items-center h-full">
              <button onClick={handleOrder} className="bg-[#0348FF] text-white px-5 py-[11.5px] rounded-sm">
                총 {orderInfo?.productList?.length}개 | {totalPaymentPrice.toLocaleString()}원 구매하기
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (orderStatus === 'PENDING') {
    return <OrderLoading />;
  }

  if (orderStatus === 'COMPLETED') {
    return <OrderCompleted />;
  }

  if (orderStatus === 'FAILED') {
    return <OrderError />;
  }
};

export default DeliveryPage;
