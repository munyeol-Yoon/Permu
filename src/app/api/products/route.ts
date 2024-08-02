import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const option = searchParams.get('option') as string;

    if (option === 'recent') {
      const { data: RecentData } = await supabase
        .from('Products')
        .select('*')
        .order('createdAt', { ascending: true })
        .limit(3);
      return NextResponse.json(RecentData);
    }
    const { data: DefaultData } = await supabase.from('Products').select('*').limit(3);
    return NextResponse.json(DefaultData);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
