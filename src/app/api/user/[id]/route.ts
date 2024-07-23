import { getUserById } from '@/api/user';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  const res = await getUserById(id);

  return NextResponse.json(res);
};
