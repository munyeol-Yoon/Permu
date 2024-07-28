import { createClient } from '@/supabase/server';
import { extractHangul } from 'es-hangul';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('query');

    if (!searchQuery) {
      return NextResponse.json({ success: false, detail: '쿼리 파라미터가 필요합니다.' });
    }

    const extractQuery = extractHangul(searchQuery).trim();

    const { data, error } = await supabase
      .from('Products')
      .select(
        `
    productId,
    title,
    thumbNailURL,
    Categories:Categories (
      categoryId,
      categoryName,
      CategoryDetail:CategoryDetail (
        categoryDetailId,
        name
      )
    )
    `
      )
      .or(`title.ilike.%${extractQuery}%`);

    if (error) {
      return NextResponse.json({ success: false, detail: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        detail: '조회 성공',
        data
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, detail: err }, { status: 500 });
  }
};
