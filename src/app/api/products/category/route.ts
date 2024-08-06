import { createClient } from '@/supabase/server';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';
interface GroupedCategories {
  [key: string]: string[];
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

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
      .in('categoryId, Brand:Brands(*), Category:Categories(*)', groupedCategories['인센스']);

    if (productError) throw productError;

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
