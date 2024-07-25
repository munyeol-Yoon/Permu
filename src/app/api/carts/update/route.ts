import { createClient } from '@/app/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const userId = searchParams.get('userId') as string;
    const productId = searchParams.get('productId') as string;
    const count = searchParams.get('count') as string;

    await supabase.from('Carts').update({ count }).eq('productId', productId).eq('userId', userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
