import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { gender, age, userId } = await request.json();

    const supabase = createClient();
    const { data, error } = await supabase.from('users').update({ gender, age }).eq('id', userId).select('*');

    if (error) return NextResponse.json({ success: false, details: error.message });
    return NextResponse.json({ success: true, details: '회원 정보 갱신' });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
