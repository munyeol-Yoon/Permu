'use client';
import Brand1 from '@/assets/brands/brand1.png';
import Brand2 from '@/assets/brands/brand2.png';
import Brand3 from '@/assets/brands/brand3.png';
import BrandBanner from '@/components/BrandBanner';
import useAlert from '@/hooks/useAlert';
import Image from 'next/image';

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
          <Image key={index} src={Brand} alt="브랜드배너" onClick={handleClick} className="cursor-pointer" />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
