import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    const { data, error } = await supabase.from('Products').select('*').eq('productId', productId).single();

    if (error) throw error;
    const productWithDiscountedPrice: Product = {
      ...data,
      discountedPrice: data.price - (data.price * data.discount) / 100
    };
    return NextResponse.json(productWithDiscountedPrice);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
