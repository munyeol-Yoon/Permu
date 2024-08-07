'use client';
import CategoryMore from '@/components/CategoryMore';
import Sliders from '@/components/Sliders';
import useBrandsQuery from '@/hooks/query/useBrandsQuery';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import { Product } from '@/types/products';
import Image from 'next/image';

interface CategorySectionProps {
  title: string;
  count: number;
}

const CategorySection = ({ title, count }: CategorySectionProps) => {
  const { data: products } = useProductsQuery('order');
  const brandIds =
    products
      ?.filter((product: Product) => product.categoryId === '84598475-403c-45db-b6da-22b8c742fea3')
      .map((product: Product) => product.brandId) || [];

  const { data: brands } = useBrandsQuery(brandIds);

  return (
    <div className="flex flex-col p-5-2">
      <CategoryMore title={title} />

      <div className="w-full h-[300px] rounded mb-[16px]">
        <Image
          src={
            'https://s3-alpha-sig.figma.com/img/a47f/eb2a/aec0f01557e9a8629921e9c5f910188f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q8MnweW112pg36rtOmL-BGxlk3QUdzAvr3ycI-hLoNtyGOeW0ceTbyz0IRIC5kQr~33Ta~lwex49XrCKknsm431h5w6uNklwAwOW1OCZSiuRT-gc56BtusPzTkRVCvhjUocCU9mnXZHdOULQRLwIrH~eHP59KrCRe2xrxNG89dz6tOtKmxIWfC71qIboyYKPaqc2ORB-1MQVsDbUr5pixXwjDeaEU48ZHuxk-Bgk4z4Kx90LQbVpE3rylRFH1G9EUTbrps75TczMTaezu0--jx0EuGrTrvdHmjr9jDNTx0xe2l6i48jQcvTnot1skUPy3I9QKGPmxG36Nz90m1R2Ew__'
          }
          width={570}
          height={300}
          alt="인기 급상승 제품 이미지1"
          className="w-full h-[300px]"
        />
      </div>

      <Sliders data={brands ?? []} count={count} />
    </div>
  );
};

export default CategorySection;
