import { getOrderInfoByUserId } from '@/api/orderInfo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  const res = await getOrderInfoByUserId(id);

  return NextResponse.json(res);
};
