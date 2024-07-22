import { insertOrder } from '@/api/order';
import { Order } from '@/types/order';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const newOrder: Order = await request.json();

  await insertOrder(newOrder);

  return NextResponse.json('주문이 완료되었습니다!');
};
