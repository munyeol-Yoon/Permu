import { createClient } from '@/supabase/server';
import { extractHangul } from 'es-hangul';
import { NextRequest, NextResponse } from 'next/server';

function getChosung(str: string): string {
  const INITIALS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const BASE_CODE = 0xac00;
  const INITIAL_COUNT = 19;
  const MEDIAL_COUNT = 21;
  const FINAL_COUNT = 28;

  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code < BASE_CODE || code > 0xd7a3) return '';
      const initialIndex = Math.floor((code - BASE_CODE) / (MEDIAL_COUNT * FINAL_COUNT));
      return INITIALS[initialIndex];
    })
    .join('');
}

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

    console.log(!searchParams);
    console.log(searchParams);

    if (!searchQuery && !categoryIdQuery) {
      return NextResponse.json({ success: false, detail: '쿼리 파라미터가 필요합니다.' }, { status: 400 });
    }

    if (searchQuery) {
      const extractQuery = extractHangul(searchQuery);
      const englishQuery = searchQuery.toLowerCase();

      console.log(`Extracted Hangul Query: ${extractQuery}`); // 예가 빈값이 되어서
      console.log(`English Query: ${englishQuery}`);

      if (extractQuery) {
        const { data, error } = await supabase
          .from('Products')
          .select(
            `
          *,
          Brands (*)
        `
          )
          .ilike('title', `%${extractQuery}%`);

        if (error) {
          throw error;
        }

        return NextResponse.json({ success: true, detail: '조회 성공', data }, { status: 200 });
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
