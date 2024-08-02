'use client';
import ProductCard from '@/components/ProductCard';
import { useSearchQuery } from '@/hooks/query';
import { Product } from '@/types/products';
import { useSearchParams } from 'next/navigation';

const ResultPage = () => {
  const searchParams = useSearchParams();
  const { data, isPending, error } = useSearchQuery(searchParams.get('query') || '');

  if (isPending) return;

  if (error) console.log(error);

  console.log(data)

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data && data.data.map((productItem: Product) => (
          <ProductCard
            key={productItem.productId}
            product={productItem}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
