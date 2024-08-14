import { createClient } from '@/supabase/server';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') as string;
    const page = Number(searchParams.get('page') as string);
    const perCount = Number(searchParams.get('perCount') as string);
    const target = searchParams.get('target') as string;
    const condition = searchParams.get('condition') === 'true';

    const start = page * perCount;
    const end = start + perCount - 1;
    const { count, error: countError } = await supabase
      .from('Reviews')
      .select('*', { count: 'exact', head: true })
      .eq('productId', productId);

    if (countError) throw countError;

    const { data, error } = await supabase
      .from('Reviews')
      .select('*,OrderDetail:OrdersDetail(*),Product:Products(notes),User:Users(*)')
      .eq('productId', productId)
      .order(target, { ascending: condition })
      .range(start, end);

    console.log(data);
    console.log(target, condition);
    if (error) throw error;
    return NextResponse.json({ data, totalCount: count });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
