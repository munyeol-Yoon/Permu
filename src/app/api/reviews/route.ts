import { createClient } from '@/supabase/server';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') as string;
    const page = searchParams.get('page');
    const { data, error, count } = await supabase
      .from('Reviews')
      .select('*,OrderDetail:OrdersDetail(*),Product:Products(notes),User:Users(*)', { count: 'exact' })
      .eq('productId', productId);
    console.log(data, count);
    if (error) throw error;
    return NextResponse.json({ data, totalCount: count });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
