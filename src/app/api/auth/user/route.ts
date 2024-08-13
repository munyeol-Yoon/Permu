import { createClient } from '@/supabase/server';
import { LoggedUser } from '@/types/types';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.getUser();

    // 가져오다 에러
    if (error) return NextResponse.json({ success: false, details: error.message });
    // 로그인한 유저 없음
    if (!authData) return NextResponse.json({ success: false, details: 'user notFound' });

    const user = authData.user;

    try {
      const { data: userData, error: userDataError } = await supabase
        .from('Users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (userDataError) return NextResponse.json({ success: false, details: userDataError.message });

      const userResponse: LoggedUser = { ...user, userData };
      return NextResponse.json({ user: userResponse });
    } catch (queryError) {
      return NextResponse.json({ success: false, details: queryError });
    }
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}

async function updatePassword(supabase: SupabaseClient, password: string) {
  const { error: passwordError } = await supabase.auth.updateUser({ password });
  if (passwordError) throw new Error(passwordError.message);
}

// 타입 수정
async function updateUserInfo(supabase: SupabaseClient, user: User, updatedUserInfo: any) {
  const { error: infoUpdateError } = await supabase
    .from('Users')
    .update({ ...updatedUserInfo, isNew: false })
    .eq('id', user.id)
    .select('*');
  if (infoUpdateError) throw new Error(infoUpdateError.message);
}

export async function PATCH(request: NextRequest) {
  try {
    const { password, ...res } = await request.json();
    const supabase = createClient();

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) throw new Error(userError.message);
    if (!user) throw new Error('User notFound');

    if (password && Object.keys(res).length > 0) {
      // 비밀번호, db 모두 업데이트
      await Promise.allSettled([updatePassword(supabase, password), updateUserInfo(supabase, user, res)]);
    } else if (password) {
      // 비밀번호만 업데이트
      await updatePassword(supabase, password);
    } else {
      // db만 업데이트
      await updateUserInfo(supabase, user, res);
    }

    return NextResponse.json({ success: true, details: '회원 정보 갱신' });
  } catch (error: any) {
    return NextResponse.json({ success: false, details: error.message || error.toString() });
  }
}
