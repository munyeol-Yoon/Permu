import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 회원가입
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOtp({
      email
      // options: {
      //   emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up/account-form`
      // }
    });

    if (error) return NextResponse.json({ success: false, details: error.message }, { status: 400 });
    if (data) return NextResponse.json({ success: true, details: '회원가입 성공' });
  } catch (error) {
    console.log;
    return NextResponse.json({ success: false, details: error });
  }
}
