import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();

    return NextResponse.json({ success: true, details: '로그아웃 성공' });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
