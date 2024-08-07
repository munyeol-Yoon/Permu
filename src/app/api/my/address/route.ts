import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const supabase = createClient();
  const { data: userAddresses, error } = await supabase.from('Addresses').select('*').eq('userId', userId);

  if (error) throw new Error(error.message);
  return NextResponse.json(userAddresses);
}

export async function POST(request: NextRequest) {
  const addressInfo = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase.from('Addresses').insert(addressInfo).select();

  if (error) throw new Error(error.message);
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const addressId = searchParams.get('addressId');
  const addressInfo = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase.from('Addresses').update(addressInfo).eq('addressId', addressId).select();

  if (error) throw new Error(error.message);
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const addressId = searchParams.get('addressId');

  const supabase = createClient();
  const { error } = await supabase.from('Addresses').delete().eq('addressId', addressId);

  if (error) throw new Error(error.message);
  return NextResponse.json('주소 삭제 성공!');
}
