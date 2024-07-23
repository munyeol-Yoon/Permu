import { getCartListById } from '@/api/cartList';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  const cartList = await getCartListById(id);

  return NextResponse.json(cartList);
};
