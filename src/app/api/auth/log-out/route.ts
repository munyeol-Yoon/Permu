import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();

    return NextResponse.json({ success: '로그아웃 성공', status: 200 });
  } catch {
    return NextResponse.json({ error: '로그아웃 실패' });
  }
}
