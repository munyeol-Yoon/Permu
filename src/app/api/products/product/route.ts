import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    const { data, error } = await supabase
      .from('Products')
      .select('*, Brand:Brands(*), Category:Categories(*)')
      .eq('productId', productId)
      .single();

    if (error) throw error;
    // const brand = await getBrandById(data.brandId);
    // const category = await getCategoryById(data.categoryId);

    const productWithDiscountedPrice: Product = {
      ...data,
      // Brand: brand,
      // Category: category,
      discountedPrice: data.price - (data.price * data.discount) / 100
    };
    return NextResponse.json(productWithDiscountedPrice);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
