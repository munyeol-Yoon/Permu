import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';
interface GroupedCategories {
  [key: string]: string[];
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') as string;
    const { data: categories, error: categoryError } = await supabase
      .from('Categories')
      .select('categoryId,categoryMainTitle');
    if (categoryError) throw categoryError;

    const groupedCategories = categories.reduce<GroupedCategories>((acc, cur) => {
      const { categoryMainTitle, categoryId } = cur;
      if (!acc[categoryMainTitle]) {
        acc[categoryMainTitle] = [];
      }
      acc[categoryMainTitle].push(categoryId);
      return acc;
    }, {});

    const { data, error: productError } = await supabase
      .from('Products')
      .select('*')
      .in('categoryId, Brand:Brands(*), Category:Categories(*)', groupedCategories['인센스'])
      .limit(9);

    if (productError) throw productError;

    const { data: wishes } = await supabase.from('Wishes').select('productId,userId').eq('userId', userId);
    const productWithDiscountedPrice: Product[] =
      data?.map((data) => ({
        ...data,
        Wish: wishes?.find((wish) => wish.productId === data.productId && wish.userId === userId),
        discountedPrice: data.price - (data.price * data.discount) / 100
      })) || [];
    return NextResponse.json(productWithDiscountedPrice);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
