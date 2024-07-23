import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) throw new Error(userError.message);

    const {
      id: userId,
      user_metadata: { name }
    } = user;

    const { gender, birth, phone } = await request.json();

    const { data, error } = await supabase
      .from('Users')
      .update({ gender, birth, phone, name })
      .eq('id', userId)
      .select('*');

    if (error) return NextResponse.json({ success: false, details: error.message });
    return NextResponse.json({ success: true, details: '회원 정보 갱신' });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
