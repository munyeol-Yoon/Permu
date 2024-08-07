import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id: userId } = params;
  try {
    const supabase = createClient();

    const { data } = await supabase
      .from('Carts')
      .select('*, Products (*, Brands (*))')
      .eq('userId', userId)
      .order('productId', { ascending: false });

    const cartsWithDiscountedPrice = data?.map((cart: any) => ({
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

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id: userId } = params;
  const { productId, volume } = await request.json();
  try {
    const supabase = createClient();

    await supabase.from('Carts').insert({ productId, userId, count: 1, volume });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id: userId } = params;
  const { productId, count, isSelected, volume } = await request.json();
  try {
    const supabase = createClient();

    await supabase.from('Carts').update({ count, isSelected, volume }).eq('productId', productId).eq('userId', userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id: userId } = params;
  const { productId } = await request.json();
  try {
    const supabase = createClient();
    await supabase.from('Carts').delete().eq('userId', userId).eq('productId', productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
