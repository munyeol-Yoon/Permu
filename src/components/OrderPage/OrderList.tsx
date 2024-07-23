'use client';

import useOrderListQuery from '@/hooks/query/useOrderListQuery';
import OrderItem from './OrderItem';

const OrderList = () => {
  const { data: orderList } = useOrderListQuery();

  return <div>{orderList?.map((v, idx) => <OrderItem key={idx} />)}</div>;
};

export default OrderList;
