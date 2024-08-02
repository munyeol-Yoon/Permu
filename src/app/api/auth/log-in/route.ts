import { createClient } from '@/supabase/server';
import { LoginForm } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password }: LoginForm = await request.json();
    const supabase = createClient();

    const {
      data: { user },
      error
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return NextResponse.json({ success: false, details: error.message });
    if (user) return NextResponse.json({ success: true, details: '로그인 성공' });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
