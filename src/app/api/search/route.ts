import { createClient } from '@/supabase/server';
import { extractHangul } from 'es-hangul';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const supabase = createClient();

    const { searchParams } = new URL(req.url);

    if (Array.from(searchParams.keys()).length === 0) {
      const { data, error } = await supabase.from('Products').select('*');

      if (error) {
        throw error;
      }

      return NextResponse.json({ success: true, detail: '조회 성공', data });
    }

    const searchQuery = searchParams.get('query');
    const categoryIdQuery = searchParams.get('categoryId');

    if (!searchQuery && !categoryIdQuery) {
      return NextResponse.json({ success: false, detail: '쿼리 파라미터가 필요합니다.' }, { status: 400 });
    }

    if (searchQuery) {
      const extractQuery = extractHangul(searchQuery);
      const englishQuery = searchQuery.toLowerCase();

      if (extractQuery) {
        const brandQuery = supabase.from('Brands').select('brandId').ilike('krName', `%${extractQuery}%`);

        const productQuery = supabase
          .from('Products')
          .select(
            `
            *,
            Brand: Brands (*)
          `
          )
          .ilike('title', `%${extractQuery}%`);

        const [brandResult, productResult] = await Promise.all([brandQuery, productQuery]);

        if (brandResult.error) {
          throw brandResult.error;
        }

        if (productResult.error) {
          throw productResult.error;
        }

        const brandIds = brandResult.data.map((brand) => brand.brandId);

        const additionalProducts = await supabase
          .from('Products')
          .select(
            `
            *,
            Brands (*)
          `
          )
          .in('brandId', brandIds);

        if (additionalProducts.error) {
          throw additionalProducts.error;
        }

        const combinedResults = [...productResult.data, ...additionalProducts.data];

        const uniqueResults = Array.from(new Set(combinedResults.map((a) => a.productId))).map((id) =>
          combinedResults.find((a) => a.productId === id)
        );

        return NextResponse.json({ success: true, detail: '조회 성공', data: uniqueResults }, { status: 200 });
      }

      if (englishQuery) {
        const { data, error } = await supabase
          .from('Products')
          .select(
            `
          *,
          Brands!inner (*)
          `
          )
          .ilike('Brands.enName', `%${englishQuery}%`);

        if (error) {
          throw error;
        }

        return NextResponse.json({ success: true, detail: '조회 성공', data }, { status: 200 });
      }
    }

    if (categoryIdQuery) {
      const { data, error } = await supabase.from('Products').select('*').eq('categoryId', categoryIdQuery);

      if (error) {
        throw error;
      }

      return NextResponse.json({ success: true, detail: '조회 성공', data }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, detail: err }, { status: 500 });
  }
};
