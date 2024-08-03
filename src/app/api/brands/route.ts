import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('Brands').select('*').limit(10);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
