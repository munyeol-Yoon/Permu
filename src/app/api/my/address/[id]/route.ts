import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createClient();
  const { data: userAddresses, error } = await supabase.from('Addresses').select('*').eq('addressId', id);

  if (error) throw new Error(error.message);
  return NextResponse.json(userAddresses);
}
