import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CompletePage = () => {
  return (
    <div className="max-w-[600px] h-full flex flex-col items-center justify-center">
      <div className="h-full flex flex-col justify-center items-center gap-9">
        <svg xmlns="http://www.w3.org/2000/svg" width="79" height="91" viewBox="0 0 79 91" fill="none">
          <path
            d="M23.2894 26.6123V17.3265C23.2894 8.30965 30.5469 1 39.4998 1C48.4526 1 55.7104 8.30965 55.7104 17.3265V26.6123M6 20.6123H72L78 90H1L6 20.6123Z"
            stroke="#0348FF"
          />
        </svg>
        <p className="text-[20px] text-[#0348FF] font-bold">주문이 완료되었습니다.</p>
      </div>
      <div className="flex flex-col gap-6 w-full px-5 mt-auto mb-4">
        <Button asChild variant="outline" className="h-[46px] m-0">
          <Link href="/user/orders">지난 주문 확인하기</Link>
        </Button>
        <Button asChild className="bg-[#0348FF] h-[46px] m-0">
          <Link href="/">쇼핑 계속하기</Link>
        </Button>
      </div>
    </div>
  );
};

export default CompletePage;
