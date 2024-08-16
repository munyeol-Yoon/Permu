import { createClient } from '@/supabase/server';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') as string;
    const limit = Number(searchParams.get('limit') as string);

    const { data: countData, error: countError } = await supabase
      .from('Reviews')
      .select('imagesURL')
      .eq('productId', productId)
      .not('imagesURL', 'is', null);
    if (countError) throw countError;
    const reviewsImagesCount = countData?.flatMap((review) => review.imagesURL) ?? [];

    const { data, error } = await supabase
      .from('Reviews')
      .select('imagesURL')
      .eq('productId', productId)
      .not('imagesURL', 'is', null)
      .limit(limit);

    if (error) throw error;
    const reviewsImages = data?.flatMap((review) => review.imagesURL) ?? [];
    return NextResponse.json({ data: reviewsImages, totalCount: reviewsImagesCount.length });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
