import { insertDeliveryInfo } from '@/api/deliveries';
import { DeliveryInfo } from '@/types/deliveries';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const newDeliveryInfo: DeliveryInfo = await request.json();

  await insertDeliveryInfo(newDeliveryInfo);

  return NextResponse.json('배송지 등록이 완료되었습니다!');
};
