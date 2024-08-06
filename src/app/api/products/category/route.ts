import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);

    const categoryIds = searchParams.get('categoryIds') as string;

    const { data } = await supabase
      .from('Products, Brands(*),Category:Categories(*)')
      .select('*')
      .in('categoryId', categoryIds.split(','));
      
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
