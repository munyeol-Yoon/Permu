'use client';
import Button from '@/components/Button/Button';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';

const products = [
  { id: 0, userId: '0', name: '와우', cost: 10000 },
  { id: 1, userId: '1', name: '와우11', cost: 13000 }
];

const Cart = () => {
  const [selectedProducts, setSelectedProducts] = useState<any[]>(products.map((product) => product.id));
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const newTotalCost: number = products.reduce((acc, product) => {
      return selectedProducts.includes(product.id) ? acc + product.cost : acc;
    }, 0);
    setTotalCost(newTotalCost);

    setIsAllSelected(selectedProducts.length === products.length);
  }, [selectedProducts]);

  const handleProductSelect = (productId: number): void => {
    const updatedSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelection);
  };
  const handleProductDelete = (productId: number): void => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    localStorage.setItem('buckets', JSON.stringify(updatedProducts));
    const updatedSelection = selectedProducts.filter((id) => id !== productId);
    setSelectedProducts(updatedSelection);
  };
  const handleAllSelect = (): void => {
    const state = !isAllSelected;
    setIsAllSelected(state);
    if (state) setSelectedProducts(products.map((product) => product.id));
    else setSelectedProducts([]);
  };

  const handleAllDelete = (): void => {
    if (confirm('전체 삭제 하시겠습니까?')) {
      localStorage.removeItem('buckets');
      setSelectedProducts([]);
    }
  };

  const handleOrder = () => {
    alert('주문 완료');
    // 주문 페이지로 가기
  };

  return (
    <div>
      <Input type="checkbox" label="전체 선택" checked={isAllSelected} onChange={handleAllSelect} />

      <Button onClick={handleAllDelete}>전체 삭제</Button>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <Input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleProductSelect(product.id)}
            />
            <h1>{product.name}</h1>
            <p>{product.cost}</p>
            <div>
              <Button>-</Button>
              <span> {1} </span>
              <Button>+</Button>
            </div>
            <Button onClick={() => handleProductDelete(product.id)}>X</Button>
          </div>
        ))
      ) : (
        <div>없음!!!!</div>
      )}
      <div className="flex flex-row">
        <h1>총 상품금액 </h1>
        <span>{totalCost.toLocaleString() || 0}</span>
      </div>

      <Button onClick={handleOrder}>주문하기</Button>
    </div>
  );
};

export default Cart;
