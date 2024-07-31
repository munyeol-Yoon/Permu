import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const { data, error } = await supabase.from('Categories').select('*').eq('categoryId', categoryId).single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
