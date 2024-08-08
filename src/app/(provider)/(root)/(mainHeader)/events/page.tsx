'use client';
import BrandBanner from '@/components/BrandBanner';
import useAlert from '@/hooks/useAlert';
import Banner1 from '@@/public/banner/banner1.svg';
import Banner2 from '@@/public/banner/banner2.svg';
import Banner3 from '@@/public/banner/banner3.svg';
import Banner4 from '@@/public/banner/banner4.svg';

const banners = [Banner1, Banner2, Banner3, Banner4];

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
        {banners.map((Banner, index) => (
          <Banner key={index} onClick={handleClick} className="cursor-pointer" />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
