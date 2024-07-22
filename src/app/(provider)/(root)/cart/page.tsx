'use client';

import useCartsMutation from '@/hooks/mutation/useCartsMutation';
import useCartsQuery from '@/hooks/query/useCartsQuery';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';

const CartPage = () => {
  const inputId = useId();
  const userId = 'c7b26340-92fc-4dc3-91ec-5151091251f2';
  const { data: carts } = useCartsQuery(userId);
  const { patchMutation, deleteAllMutation, deleteMutation } = useCartsMutation();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalDiscountCost, setDiscountCost] = useState<number>(0);
  const [coupons, setCoupons] = useState<Coupon[] | null>(null);

  useEffect(() => {
    if (carts?.data) {
      setSelectedProducts(carts.data.map((cart: Cart) => cart.productId));
    }
  }, [carts]);

  useEffect(() => {
    if (carts?.data) {
      const newTotalCost = carts.data.reduce((acc: number, cur: Cart) => {
        return selectedProducts.includes(cur.productId) ? acc + cur.Products.price * cur.count : acc;
      }, 0);
      setTotalCost(newTotalCost);
      const newTotalDiscountCost = carts.data.reduce((acc: number, cur: Cart) => {
        return selectedProducts.includes(cur.productId) ? acc + cur.Products.discountedPrice * cur.count : acc;
      }, 0);
      setDiscountCost(newTotalDiscountCost);
      setIsAllSelected(selectedProducts.length === carts.data.length);
    }
  }, [carts?.data, selectedProducts]);

  const handleCountCart = (productId: number, count: number, cal: boolean) => {
    patchMutation.mutate({ productId, userId, count, cal });
  };

  const handleProductSelect = (productId: number): void => {
    const updatedSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelection);
  };

  const handleAllSelect = (): void => {
    const state = !isAllSelected;
    setIsAllSelected(state);
    if (state) setSelectedProducts(carts?.data.map((cart: Cart) => cart.productId) || []);
    else setSelectedProducts([]);
  };
  const handleProductDelete = (productId: number): void => {
    if (confirm('삭제 하시겠습니까?')) {
      deleteMutation.mutate({ productId, userId });
    }
  };
  const handleAllDelete = async (): Promise<void> => {
    if (confirm('전체 삭제 하시겠습니까?')) {
      deleteAllMutation.mutate({ userId });
    }
  };

  const handleSelectCoupon = (discount: number): void => {
    //마일리지 적용된 총합 금액 로직 짤 함수
  };
  const handleOrder = (): void => {
    alert('주문페이지로 가기');
  };

  return (
    <div>
      <label htmlFor={inputId}>전체 선택</label>
      <input type="checkbox" id={inputId} checked={isAllSelected} onChange={handleAllSelect} />
      <button onClick={handleAllDelete}>전체 삭제</button>
      {carts?.data.map((cart: Cart) => (
        <div key={cart.productId}>
          <input
            type="checkbox"
            checked={selectedProducts.includes(cart.productId)}
            onChange={() => handleProductSelect(cart.productId)}
          />

          <Link href={`/products/${cart.productId}`}>
            <Image src={cart.Products.thumbNailURL} width={100} height={100} alt={`${cart.productId}`} />
          </Link>

          <h1>{cart.Products.title}</h1>
          <p>
            {(cart.Products.price * cart.count).toLocaleString()} -&gt;
            {(cart.Products.discountedPrice * cart.count).toLocaleString()}
          </p>
          <div>
            <button onClick={() => handleCountCart(cart.productId, cart.count, false)}>-</button>
            <span> {cart.count} </span>
            <button onClick={() => handleCountCart(cart.productId, cart.count, true)}>+</button>
          </div>

          <button onClick={() => handleProductDelete(cart.productId)}>X</button>
        </div>
      ))}
      <div className="flex flex-row">
        <h1>총 상품금액 </h1>
        <p>
          {totalCost.toLocaleString()} -&gt; {totalDiscountCost.toLocaleString()}
        </p>
      </div>

      <div>
        <span>마일리지</span>
        {coupons?.map((coupon) => (
          <p key={coupon.couponId}>
            <button onClick={() => handleSelectCoupon(coupon.discount)}>{coupon.discount}</button>
          </p>
        ))}
      </div>
      <button onClick={handleOrder}>주문하기</button>
    </div>
  );
};

export default CartPage;
