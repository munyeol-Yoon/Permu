'use client';

import Coupon from '@/components/products/Coupon';
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
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalDiscountCost, setDiscountCost] = useState<number>(0);

  useEffect(() => {
    if (carts) {
      const newTotalCost = carts.reduce((acc: number, cur: Cart) => {
        return selectedProducts.includes(cur.productId) ? acc + cur.Products.price * cur.count : acc;
      }, 0);
      setTotalCost(newTotalCost);
      const newTotalDiscountCost = carts.reduce((acc: number, cur: Cart) => {
        return selectedProducts.includes(cur.productId) ? acc + cur.Products.discountedPrice * cur.count : acc;
      }, 0);
      setDiscountCost(newTotalDiscountCost);

      setIsAllSelected(selectedProducts.length === carts.length);
    }
  }, [carts, selectedProducts]);

  const handleCountCart = (productId: number, count: number, cal: boolean): void => {
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
    if (state) setSelectedProducts(carts?.map((cart: Cart) => cart.productId) || []);
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

  return (
    <div>
      <label htmlFor={inputId}>전체 선택</label>
      <input type="checkbox" id={inputId} checked={isAllSelected} onChange={handleAllSelect} />
      <button onClick={handleAllDelete}>전체 삭제</button>
      {carts?.map((cart: Cart) => (
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
            {(cart.Products.discountedPrice * cart.count).toLocaleString()} {cart.Products.discount}%
          </p>
          <div>
            <button onClick={() => handleCountCart(cart.productId, cart.count, false)}>-</button>
            <span> {cart.count} </span>
            <button onClick={() => handleCountCart(cart.productId, cart.count, true)}>+</button>
          </div>

          <button onClick={() => handleProductDelete(cart.productId)}>X</button>
        </div>
      ))}
      <Coupon totalCost={totalCost} totalDiscountCost={totalDiscountCost} />
    </div>
  );
};

export default CartPage;
