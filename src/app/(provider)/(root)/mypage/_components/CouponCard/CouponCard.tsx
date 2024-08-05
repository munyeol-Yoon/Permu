import { Button } from '@/components/ui/button';
import { Tables } from '@/types/supabase';
import { formatDate } from '@/utils/format';

interface CouponCardProps {
  coupon: Tables<'Coupon'>;
}
const CouponCard = ({ coupon }: CouponCardProps) => {
  const { discount, name } = coupon;
  const formattedIssueDate = formatDate(coupon.issueDate || '');
  const formattedExpireDate = formatDate(coupon.expirationDate || '');
  return (
    <div className="flex flex-col border rounded px-5 py-[26px] gap-y-2.5">
      <h3 className="text-base font-semibold">{name}</h3>
      <p className="text-slate-400">
        {formattedIssueDate} ~ {formattedExpireDate}
      </p>
      <p className="text-2xl font-bold text-blue-500">{discount}</p>
      <div className="flex items-center justify-between">
        <p className="text-base">최대 4,000원 이상 구매시</p>
        <Button variant="secondary">적용 가능 상품보기</Button>
      </div>
    </div>
  );
};

export default CouponCard;
