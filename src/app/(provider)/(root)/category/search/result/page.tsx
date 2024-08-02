'use client';
import ProductCard from '@/components/ProductCard';
import { useSearchQuery } from '@/hooks/query';
import { useSearchParams } from 'next/navigation';

interface Product {
  productId: number;
  createdAt: string;
  title: string;
  price: number;
  thumbNailURL: string;
  discount: number;
}

const ResultPage = () => {
  const searchParams = useSearchParams();
  const { data, isPending, error } = useSearchQuery(searchParams.get('query') || '');

  if (isPending) return;

  if (error) console.log(error);

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map((product: Product) => (
          <ProductCard
            key={product.productId}
            brand="브랜드"
            name={product.title}
            discountPercentage={product.discount}
            price={product.price}
            thumbNailURL={product.thumbNailURL}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
