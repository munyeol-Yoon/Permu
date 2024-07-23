import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const supabase = createClient();
    const { data: userCoupons, error } = await supabase.from('Coupon').select('*').eq('userId', userId);

    if (error) return NextResponse.json({ success: false, details: error.message });
    if (userCoupons) return NextResponse.json(userCoupons);
  } catch (error) {
    return NextResponse.json({ success: false, details: error });
  }
}
