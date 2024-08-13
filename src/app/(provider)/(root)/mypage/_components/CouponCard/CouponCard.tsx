import { Button } from '@/components/ui/button';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';

interface CouponCardProps {
  coupon: Tables<'Coupon'>;
}
const CouponCard = ({ coupon }: CouponCardProps) => {
  const { discount, name, issueDate, expirationDate } = coupon;
  const formattedIssueDate = dayjs(issueDate).format('YYYY.MM.DD');
  const formattedExpireDate = dayjs(expirationDate).format('YYYY.MM.DD');
  return (
    <div className="flex flex-col border rounded px-5 py-[26px] gap-y-2.5">
      <h3 className="text-base font-semibold">{name}</h3>
      <p className="text-sm text-muted">
        {formattedIssueDate} ~ {formattedExpireDate}
      </p>
      <p className="text-2xl font-bold text-accent">{discount}</p>
      <div className="flex items-center justify-between">
        <p className="text-base">최대 4,000원 이상 구매시</p>
        <Button>적용 가능 상품보기</Button>
      </div>
    </div>
  );
};

export default CouponCard;
