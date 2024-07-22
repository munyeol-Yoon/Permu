import { createClient } from '@/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔥', request);
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
      }
    });

    if (error) return NextResponse.json({ success: false, details: error.message });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
