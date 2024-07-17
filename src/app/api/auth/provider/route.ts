import { createClient } from '@/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
      }
    });

    if (data) return NextResponse.json(data, { status: 200 });
    if (error) return NextResponse.json({ error: '로그인 실패', details: error.message });
  } catch (error) {
    return NextResponse.json({ error: '로그인 처리 중 네트워크 오류', details: error });
  }
}
