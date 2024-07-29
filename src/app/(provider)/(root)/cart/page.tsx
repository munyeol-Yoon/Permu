'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useCartsMutation } from '@/hooks/mutation';
import { useCartsQuery } from '@/hooks/query';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

const CartPage = () => {
  const { loggedUser } = useAuth();
  const { data: carts } = useCartsQuery();
  const { patchMutation, deleteAllMutation, deleteMutation } = useCartsMutation();

  const totalPrice = useMemo(() => {
    if (carts?.length) {
      return carts?.reduce((acc, cur) => acc + cur.Products.discountedPrice, 0);
    }
  }, [carts]);

  const handleProductDelete = (productId: number): void => {
    if (confirm('삭제 하시겠습니까?')) {
      if (loggedUser) deleteMutation.mutate({ productId, userId: loggedUser.id });
    }
  };

  const handleAllDelete = async (): Promise<void> => {
    if (confirm('전체 삭제 하시겠습니까?')) {
      if (loggedUser) deleteAllMutation.mutate({ userId: loggedUser.id });
    }
  };

  return (
    <div className="max-w-[600px] flex flex-col">
      <div className="flex justify-between px-[50px] py-5 mb-[52px] border-b border-b-[#B3B3B3]">
        <div className="flex items-center gap-4">
          <Checkbox />
          <p className="text-xl">전체 {carts?.length ?? 0}개</p>
        </div>
        <p className="text-xl text-[#B3B3B3]">선택 삭제</p>
      </div>

      <div className="flex flex-col gap-5">
        {carts?.length ? (
          carts.map((cartItem) => (
            <div key={cartItem.productId} className="flex items-center px-5">
              <Checkbox />
              <div className="relative aspect-video max-w-[100px] h-[100px] bg-black overflow-hidden mx-[33px]">
                <Image src={cartItem.Products.thumbNailURL} width={100} height={100} alt="" className="absolute" />
              </div>
              <div className="flex flex-col px-2.5 w-full">
                <div className="flex justify-between items-center">
                  <p className="text-xs mb-1">{cartItem.Products.title}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    onClick={() => handleProductDelete(cartItem.productId)}
                  >
                    <path d="M13 0.500001L1 12.5M13 12.5L1 0.5" stroke="#231815" />
                  </svg>
                </div>
                <p className="font-semibold mb-2.5">{cartItem.Products.content}</p>
                <p className="text-xs text-[#B3B3B3] mb-1.5">TODO: 해당 제품의 옵션 추가</p>
                <div className="flex justify-between items-center w-full">
                  <Button variant="outline" className="text-xs border-black rounded-none px-2.5 py-2">
                    TODO: 해당 제품의 옵션 변경
                  </Button>
                  <p className="text-xs">{cartItem.Products.discountedPrice ?? cartItem.Products.price}원</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>장바구니에 상품이 없습니다.</p>
        )}
      </div>

      <div className="fixed bottom-0 h-[340px] flex flex-col items-center z-50 max-w-[598px] w-full bg-white shadow-[0px_-19px_5px_0px_rgba(0,0,0,0.00),0px_-12px_5px_0px_rgba(0,0,0,0.01),0px_-7px_4px_0px_rgba(0,0,0,0.05),0px_-3px_3px_0px_rgba(0,0,0,0.09),0px_-1px_2px_0px_rgba(0,0,0,0.10)]">
        <div className="py-3 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
            <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
          </svg>
        </div>
        <div className="flex flex-col w-full p-5 gap-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <p className="text-xl">마일리지 사용</p>
              <p className="text-[#B3B3B3]">
                사용 가능한 마일리지 <span className="text-xl">1,000P</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="0" className="text-xl text-right max-w-[101px] h-[30px]" />
              <p className="text-xl font-bold">P</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-xl">
            <div className="flex items-center gap-11">
              <p>쿠폰 사용</p>
              <Button variant="outline" className="text-xl border-black">
                쿠폰 옵션 확인
              </Button>
            </div>
            <p className="text-[#0348FF] font-bold">-0원</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-[34px] h-full font-bold max-w-[400px] w-full">
          <p className="w-full text-center bg-black text-white px-5 py-[11.5px] rounded-sm">쇼핑 계속하기</p>
          <Link
            href="/order/delivery"
            className="w-full text-center bg-[#0348FF] text-white px-5 py-[11.5px] rounded-sm"
          >
            총 {carts?.length ?? 0}개 | {totalPrice}원 구매하기
          </Link>
        </div>
      </div>
    </div>

    // <div>
    //   <label htmlFor={inputId}>전체 선택</label>
    //   <input type="checkbox" id={inputId} checked={isAllSelected} onChange={handleAllSelect} />
    //   <button onClick={handleAllDelete}>전체 삭제</button>
    //   {displayedCarts?.map((cart: Cart) => (
    //     <div key={cart.productId}>
    //       <input
    //         type="checkbox"
    //         checked={selectedProducts.includes(cart.productId)}
    //         onChange={() => handleProductSelect(cart.productId)}
    //       />

    //       <Link href={`/products/${cart.productId}`}>
    //         <Image src={cart.Products?.thumbNailURL} width={100} height={100} alt={`${cart.productId}`} />
    //       </Link>

    //       <h1>{cart.Products?.title}</h1>
    //       <p>
    //         {(cart.Products?.price * cart.count).toLocaleString()} -&gt;
    //         {(cart.Products?.discountedPrice * cart.count).toLocaleString()} {cart.Products?.discount}%
    //       </p>
    //       <div>
    //         <button onClick={() => handleCountCart(cart.productId, cart.count, false)}>-</button>
    //         <span> {cart.count} </span>
    //         <button onClick={() => handleCountCart(cart.productId, cart.count, true)}>+</button>
    //       </div>

    //       <button onClick={() => handleProductDelete(cart.productId)}>X</button>
    //     </div>
    //   ))}
    //   <Coupon totalCost={totalCost} totalDiscountCost={totalDiscountCost} />
    // </div>
  );
};

export default CartPage;
