'use client';
import CategoryMore from '@/components/CategoryMore';
import useProductsQuery from '@/hooks/query/useProductsQuery';

import { SkeletonCard } from '../Card';
import { Sliders } from '../Sliders';

const CurrentProducts = ({ title, option }: { title: string; option: string }) => {
  const { data: products, isPending } = useProductsQuery(option);

  const content = isPending ? (
    <div className="flex gap-x-6 mt-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  ) : (
    <Sliders data={products ?? []} count={3} />
  );

  return (
    <div className="flex flex-col p-5-2">
      <CategoryMore title={title} />
      {content}
    </div>
  );
};

export default CurrentProducts;
