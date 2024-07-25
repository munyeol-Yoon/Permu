import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') as string;
    const userId = searchParams.get('userId') as string;

    await supabase.from('Carts').insert({ productId, userId, count: 1 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function DELETE(request: NextResponse) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const isAll = searchParams.get('isAll') as string;
    const userId = searchParams.get('userId') as string;
    if (isAll === 'true') {
      await supabase.from('Carts').delete().eq('userId', userId);
    } else if (isAll === 'false') {
      const productId = searchParams.get('productId') as string;

      await supabase.from('Carts').delete().eq('userId', userId).eq('productId', productId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') as string;

    const { data } = await supabase
      .from('Carts')
      .select('*, Products (categoryId,title,price,thumbNailURL,discount)')
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

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') as string;
    const productId = searchParams.get('productId') as string;
    const count = searchParams.get('count') as string;

    await supabase.from('Carts').update({ count }).eq('productId', productId).eq('userId', userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
