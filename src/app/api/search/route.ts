import { createClient } from '@/app/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('query');

    if (!searchQuery) {
      return NextResponse.json({ success: false, detail: '쿼리 파라미터가 필요합니다.' }, { status: 400 });
    }

    const { data, error } = await supabase.from('Products').select('*').ilike('title', `%${searchQuery}`);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, detail: '조회 성공', data });
  } catch (err) {
    return NextResponse.json({ success: false, detail: err });
  }
}
