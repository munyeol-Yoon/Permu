'use client';
import BrandBanner from '@/components/BrandBanner';
import useAlert from '@/hooks/useAlert';
import Brand1 from '@@/public/brands/brand1.svg';
import Brand2 from '@@/public/brands/brand2.svg';
import Brand3 from '@@/public/brands/brand3.svg';

const brands = [Brand1, Brand2, Brand3];

const EventPage = () => {
  const { showInfoAlert } = useAlert();
  const handleClick = () => showInfoAlert('준비중입니다!');
  return (
    <div>
      <BrandBanner>
        <div className="w-full flex justify-center items-center text-xl font-bold">
          <span className="text-white">브랜드관</span>
        </div>
      </BrandBanner>

      <div className="flex flex-col items-center justify-center gap-y-10 my-10">
        {brands.map((Brand, index) => (
          <Brand key={index} onClick={handleClick} className="cursor-pointer" />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
