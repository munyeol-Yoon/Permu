import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 인증번호
export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();
    const supabase = createClient();

    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });

    if (error) return NextResponse.json({ success: false, details: error.message });
    if (data) return NextResponse.json({ success: true, details: 'otp 인증 성공' });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
