'use client';
import CategoryMore from '@/components/CategoryMore';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import Sliders from '../Sliders';

const CurrentProducts = ({ title, option }: { title: string; option: string }) => {
  const { data: products } = useProductsQuery(option);

  return (
    <div className="flex flex-col p-5-2">
      <CategoryMore title={title} />
      <Sliders data={products ?? []} count={3} />
    </div>
  );
};

export default CurrentProducts;
