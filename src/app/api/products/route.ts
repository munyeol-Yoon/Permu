import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const option = searchParams.get('option') as string;

    if (option === 'recent') {
      const { data: recentData } = await supabase.from('Products').select('*').limit(3);

      const brandIds = recentData?.map((product) => product.brandId) || [];
      const { data: brands } = await supabase.from('Brands').select('*').in('brandId', brandIds);

      const brandMap = new Map(brands?.map((brand) => [brand.brandId, brand]));

      const productWithDiscountedPrice: Product[] =
        recentData?.map((data) => ({
          ...data,
          Brand: brandMap.get(data.brandId) || null,
          discountedPrice: data.price - (data.price * data.discount) / 100
        })) || [];

      return NextResponse.json(productWithDiscountedPrice);
    }
    const { data: defaultData } = await supabase.from('Products').select('*').limit(3);

    const brandIds = defaultData?.map((product) => product.brandId) || [];
    const { data: brands } = await supabase.from('Brands').select('*').in('brandId', brandIds);

    const brandMap = new Map(brands?.map((brand) => [brand.brandId, brand]));

    const productWithDiscountedPrice: Product[] =
      defaultData?.map((data) => ({
        ...data,
        Brand: brandMap.get(data.brandId) || null,
        discountedPrice: data.price - (data.price * data.discount) / 100
      })) || [];

    return NextResponse.json(productWithDiscountedPrice);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
