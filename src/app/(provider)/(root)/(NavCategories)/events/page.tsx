'use client';
import Banner1 from '@/assets/events/event1.png';
import Banner2 from '@/assets/events/event2.png';
import Banner3 from '@/assets/events/event3.png';
import Banner4 from '@/assets/events/event4.png';
import BrandBanner from '@/components/BrandBanner';
import useAlert from '@/hooks/useAlert';
import Image from 'next/image';

const events = [Banner1, Banner2, Banner3, Banner4];

const EventPage = () => {
  const { showInfoAlert } = useAlert();
  const handleClick = () => showInfoAlert('준비중입니다!');
  return (
    <div>
      <BrandBanner>
        <div className="w-full flex justify-center items-center text-xl font-bold">
          <span className="text-white">이벤트</span>
        </div>
      </BrandBanner>

      <div className="flex flex-col items-center justify-center gap-y-10 my-10">
        {events.map((Banner, index) => (
          <Image key={index} src={Banner} alt="이벤트배너" onClick={handleClick} className="cursor-pointer" />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
