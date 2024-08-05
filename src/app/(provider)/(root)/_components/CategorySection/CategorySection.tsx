'use client';
import { getBrands } from '@/api/brand';
import CategoryMore from '@/components/CategoryMore';
import { CategoryMoreProps } from '@/components/CategoryMore/CategoryMore';
import Sliders from '@/components/Sliders';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CategorySection = ({ title }: CategoryMoreProps) => {
  const [brands, setBrands] = useState<Tables<'Brands'>[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands();
      setBrands(data);
    };
    fetchBrands();
  }, []);

  return (
    <div className="flex flex-col mt-[46px] p-5-2">
      <CategoryMore title={title} />

      <div className="w-full h-[300px] rounded mb-[16px]">
        <Image
          src="https://s3-alpha-sig.figma.com/img/a47f/eb2a/aec0f01557e9a8629921e9c5f910188f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q8MnweW112pg36rtOmL-BGxlk3QUdzAvr3ycI-hLoNtyGOeW0ceTbyz0IRIC5kQr~33Ta~lwex49XrCKknsm431h5w6uNklwAwOW1OCZSiuRT-gc56BtusPzTkRVCvhjUocCU9mnXZHdOULQRLwIrH~eHP59KrCRe2xrxNG89dz6tOtKmxIWfC71qIboyYKPaqc2ORB-1MQVsDbUr5pixXwjDeaEU48ZHuxk-Bgk4z4Kx90LQbVpE3rylRFH1G9EUTbrps75TczMTaezu0--jx0EuGrTrvdHmjr9jDNTx0xe2l6i48jQcvTnot1skUPy3I9QKGPmxG36Nz90m1R2Ew__"
          width={570}
          height={300}
          alt="인기 급상승 제품 이미지1"
          className="w-full h-[300px]"
        />
      </div>

      <Sliders data={brands} count={4} />
    </div>
  );
};

export default CategorySection;
