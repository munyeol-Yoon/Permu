import { createClient } from '@/app/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') as string;

    const { data } = await supabase
      .from('Carts')
      .select(`*, Products (categoryId,title,price,thumbNailURL,discount)`)
      .eq('userId', userId)
      .order('productId', { ascending: false });

    const cartsWithDiscountedPrice = data?.map((cart: Cart) => ({
      ...cart,
      Products: {
        ...cart.Products,
        discountedPrice: cart.Products.price - (cart.Products.price * cart.Products.discount) / 100
      }
    }));

    return NextResponse.json(cartsWithDiscountedPrice);
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
