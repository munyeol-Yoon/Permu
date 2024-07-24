import { insertOrderDetail } from '@/api/order';
import { OrderDetail } from '@/types/order';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const newOrderDetail: OrderDetail = await request.json();

  await insertOrderDetail(newOrderDetail);

  return NextResponse.json('주문이 완료되었습니다!');
};
