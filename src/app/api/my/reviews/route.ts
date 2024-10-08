import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('Reviews')
      .select('*, Products(title, thumbNailURL, Brands(krName))')
      .eq('userId', userId);
    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
