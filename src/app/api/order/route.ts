import { insertDeliveryInfo } from '@/api/deliveries';
import { insertOrder, insertOrderDetail } from '@/api/order';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { order: orderInfo, deliveries: deliveryInfo, productIdList } = await request.json();

  const orderId = orderInfo.orderId;

  await insertOrder(orderInfo);
  await insertDeliveryInfo(deliveryInfo);

  productIdList.forEach(async (productId: number) => await insertOrderDetail({ orderId, productId }));

  return NextResponse.json('주문이 완료되었습니다!');
};
