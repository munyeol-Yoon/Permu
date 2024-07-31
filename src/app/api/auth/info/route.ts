import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const { email, password, ...res } = await request.json();
    const supabase = createClient();
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) throw new Error(userError.message);
    if (!user) throw new Error('User notFound');

    // 비밀번호 업데이트
    const { data: passwordUpdate, error: passwordError } = await supabase.auth.updateUser({ password });
    if (passwordError) throw new Error(passwordError.message);

    //db 업데이트
    const { data: infoUpdate, error: infoUpdateError } = await supabase
      .from('Users')
      .update({ ...res, isNew: false })
      .eq('id', user.id)
      .select('*');

    if (infoUpdateError) throw new Error(infoUpdateError.message);
    return NextResponse.json({ success: true, details: '회원 정보 갱신' });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
