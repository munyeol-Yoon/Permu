import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);

    const productId = searchParams.get('productId') as string;
    const userId = searchParams.get('userId') as string;

    const { count: count } = await supabase
      .from('Wishes')
      .select('count', { count: 'exact' })
      .eq('productId', productId)
      .single();

    const { data } = productId
      ? await supabase
          .from('Wishes')
          .select('userId,productId')
          .eq('productId', productId)
          .eq('userId', userId)
          .single()
      : await supabase.from('Wishes').select('userId,productId').eq('userId', userId).single();
    return NextResponse.json({ success: true, data: data ?? null, count });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') as string;
    const userId = searchParams.get('userId') as string;
    await supabase.from('Wishes').delete().eq('userId', userId).eq('productId', productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') as string;
    const userId = searchParams.get('userId') as string;
    await supabase.from('Wishes').insert({ productId, userId });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
