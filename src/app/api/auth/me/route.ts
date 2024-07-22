import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json({ success: false, details: error.message });
    if (!authData) return NextResponse.json({ success: false, details: 'user notFound' });

    const user = authData.user;

    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    if (userDataError) return NextResponse.json({ success: false, details: userDataError.message });

    const userResponse = { ...user, userData };

    return NextResponse.json({ user: userResponse });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
