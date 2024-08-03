import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';

export async function fetchProducts(data: any[] | null) {
  const supabase = createClient();

  const brandIds = data?.map((product) => product.brandId) || [];
  const { data: brands } = await supabase.from('Brands').select('*').in('brandId', brandIds);

  const brandMap = new Map(brands?.map((brand) => [brand.brandId, brand]));

  const productWithDiscountedPrice: Product[] =
    data?.map((data) => ({
      ...data,
      Brand: brandMap.get(data.brandId) || null,
      discountedPrice: data.price - (data.price * data.discount) / 100
    })) || [];
  return productWithDiscountedPrice;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const option = searchParams.get('option') as string;

    if (option === 'recent') {
      const { data: recentData } = await supabase.from('Products').select('*').limit(3);

      const products = await fetchProducts(recentData);
      return NextResponse.json(products);
    }
    const { data: defaultData } = await supabase.from('Products').select('*').limit(3);

    const products = await fetchProducts(defaultData);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
