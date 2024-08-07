import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const brandIds = searchParams.get('brandIds') as string;
    const { data } = await supabase.from('Brands').select('*').in('brandId', brandIds.split(','));

    return NextResponse.json(data ?? []);
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
