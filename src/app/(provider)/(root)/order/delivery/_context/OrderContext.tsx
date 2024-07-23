'use client';

import { createContext, PropsWithChildren, useState } from 'react';

const initialValue = {};

const OrderContext = createContext(null);

const OrderProvider = ({ children }: PropsWithChildren) => {
  // 주문 정보 State
  const [ordererName, setOrdererName] = useState<string>('');
  const [ordererPhoneNumber, setOrdererPhoneNumber] = useState();
  const [] = useState();

  // 배송 정보 State
  const [] = useState();
  const [] = useState();
  const [] = useState();
  const [] = useState();
  return <OrderContext.Provider value={null}>{children}</OrderContext.Provider>;
};

export default OrderProvider;
