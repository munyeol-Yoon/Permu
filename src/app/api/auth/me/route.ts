import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json({ success: false, details: error.message });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
