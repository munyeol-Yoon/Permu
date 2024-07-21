'use client';

import { deleteAllCartByUser } from '@/api/product';
import useCartsMutation from '@/hooks/mutation/useCartsMutation';
import useCartsQuery from '@/hooks/query/useCartsQuery';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const userId = 'c7b26340-92fc-4dc3-91ec-5151091251f2';
  const { data: carts } = useCartsQuery(userId);
  const addMutation = useCartsMutation();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (carts?.data) {
      setSelectedProducts(carts.data.map((cart: any) => cart.productId));
    }
  }, [carts]);

  useEffect(() => {
    if (carts?.data) {
      const newTotalCost = carts.data.reduce((acc: number, cur: any) => {
        return selectedProducts.includes(cur.productId) ? acc + cur.Products.price * cur.count : acc;
      }, 0);
      setTotalCost(newTotalCost);

      setIsAllSelected(selectedProducts.length === carts.data.length);
    }
  }, [carts?.data, selectedProducts]);

  const handleCountCart = (productId: string, cal: boolean) => {
    const count = carts?.data.find((cart: any) => cart.productId === productId)?.count;
    const newCount = cal ? count + 1 : count - 1;
    addMutation.mutate({ productId, userId, cal, count: newCount });
  };

  const handleProductSelect = (productId: string): void => {
    const updatedSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelection);
  };

  const handleAllSelect = (): void => {
    const state = !isAllSelected;
    setIsAllSelected(state);
    if (state) setSelectedProducts(carts?.data.map((cart: any) => cart.productId) || []);
    else setSelectedProducts([]);
  };

  const handleAllDelete = async () => {
    if (confirm('전체 삭제 하시겠습니까?')) {
      await deleteAllCartByUser(userId);
      setSelectedProducts([]);
    }
  };

  const handleOrder = () => {
    alert('주문페이지로 가기');
  };

  return (
    <div>
      <label>전체 선택</label>
      <input type="checkbox" checked={isAllSelected} onChange={handleAllSelect} />
      <button onClick={handleAllDelete}>전체 삭제</button>
      {carts?.data.map((cart: any) => (
        <div key={cart.productId}>
          <input
            type="checkbox"
            checked={selectedProducts.includes(cart.productId)}
            onChange={() => handleProductSelect(cart.productId)}
          />
          <Link href={`/products/${cart.productId}`}>
            <Image src={cart.Products.thumbNailURL} width={100} height={100} alt={cart.productId} />
          </Link>

          <h1>{cart.Products.title}</h1>
          <p>{cart.Products.price}</p>
          <div>
            <button onClick={() => handleCountCart(cart.productId, false)}>-</button>
            <span> {cart.count} </span>
            <button onClick={() => handleCountCart(cart.productId, true)}>+</button>
          </div>
        </div>
      ))}
      <div className="flex flex-row">
        <h1>총 상품금액 </h1>
        <span>{totalCost || 0}</span>
      </div>
      <button onClick={handleOrder}>주문하기</button>
    </div>
  );
};

export default CartPage;
