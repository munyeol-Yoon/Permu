'use client';
import CategoryMore from '@/components/CategoryMore';
import Sliders from '@/components/Sliders';
import { Skeleton } from '@/components/ui/skeleton';
import useBrandsQuery from '@/hooks/query/useBrandsQuery';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import { Product } from '@/types/products';
import Image from 'next/image';

interface CategorySectionProps {
  title: string;
  count: number;
}

const CategorySection = ({ title, count }: CategorySectionProps) => {
  const { data: products, isPending } = useProductsQuery('order');
  const brandIds =
    products
      ?.filter((product: Product) => product.categoryId === '84598475-403c-45db-b6da-22b8c742fea3')
      .map((product: Product) => product.brandId) || [];

  const { data: brands } = useBrandsQuery(brandIds);

  const content = isPending ? (
    <div className="flex gap-x-6 mt-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton size="rect" key={idx} />
      ))}
    </div>
  ) : (
    <Sliders data={brands ?? []} count={count} />
  );

  return (
    <div className="flex flex-col p-5-2">
      <CategoryMore title={title} />

      <div className="w-full h-[300px] rounded mb-[16px] mt-4">
        <Image
          src={'https://img.29cm.co.kr/item/202401/11eebe9d80e9739391ebb5f8eb5447c1.jpg?width=700'}
          width={570}
          height={300}
          alt="인기 급상승 제품 이미지1"
          className="w-full h-[300px]"
          loading="eager"
        />
      </div>

      {content}
    </div>
  );
};

export default CategorySection;
