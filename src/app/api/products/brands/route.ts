import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') as string;
    const { data: brands, error: brandError } = await supabase.from('Brands').select('count').single();
    if (brandError) throw brandError;
    //const randomIndex = Math.floor(Math.random() * brands.count) + 1;

    const { data, error } = await supabase
      .from('Products')
      .select('*, Brand:Brands(*), Category:Categories(*)')
      .eq('brandId', 12);

    if (error) throw error;
    const productWithDiscountedPrice: Product[] =
      data?.map((data) => ({
        ...data,
        discountedPrice: data.price - (data.price * data.discount) / 100
      })) || [];
    return NextResponse.json(productWithDiscountedPrice);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
