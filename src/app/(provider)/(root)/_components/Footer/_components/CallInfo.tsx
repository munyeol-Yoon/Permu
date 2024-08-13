import { Button } from '@/components/ui/button';

const CallInfo = () => {
  return (
    <div className="flex flex-col items-center justify-between py-5 border-r gap-y-5">
      <div className="text-center">
        <p>CS CENTER</p>
        <p className="underline">010-4188-1824</p>
      </div>
      <div className="text-center font-medium">
        <p>
          상담시간 <span className="block md:inline">AM10:00 ~ PM:06:00</span>
        </p>

        <p>
          점심시간 <span className="block md:inline">PM12:00 ~ PM01:00</span>
        </p>
      </div>

      <p>휴일 및 공휴일 휴무</p>

      <Button size={'sm'} className="text-sm md:text-base">
        고객센터 전화 연결
      </Button>
    </div>
  );
};

export default CallInfo;
