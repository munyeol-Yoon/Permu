import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    // 에러 발생 시 이동할 곳이 없음
    if (!sessionError) {
      const { data, error: userError } = await supabase.auth.getUser();

      if (data && !userError) {
        const { data: user, error: userDataError } = await supabase
          .from('Users')
          .select('isNew')
          .eq('id', data.user.id)
          .single();

        if (user?.isNew) return NextResponse.redirect(`${origin}/auth/sign-up/form`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
