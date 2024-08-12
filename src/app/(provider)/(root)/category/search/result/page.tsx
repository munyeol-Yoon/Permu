'use client';

import Loading from '@/components/Loading';
import ProductCard from '@/components/Sliders/ProductCard';
import { useSearchQuery } from '@/hooks/query';
import { Product } from '@/types/products';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SearchNotFound from '../_components/SearchNotFound';

const ResultPageContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const categoryId = searchParams.get('categoryId');
  const { data, isPending, error } = useSearchQuery(query || '', categoryId || '');

  if (isPending) return <Loading />;

  if (data.data.length <= 0) return <SearchNotFound />;

  return (
    <>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {data.data.map((productItem: Product) => (
            <ProductCard key={productItem.productId} product={productItem} />
          ))}
        </div>
      </div>
    </>
  );
};

const ResultPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPageContent />
    </Suspense>
  );
};

export default ResultPage;
