import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 회원가입
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOtp({
      email
    });

    if (error) throw new Error(error.message);
    if (data) return NextResponse.json({ success: true, details: '회원가입 성공' });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
