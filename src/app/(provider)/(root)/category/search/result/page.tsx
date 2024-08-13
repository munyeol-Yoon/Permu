'use client';

import Loading from '@/components/Loading';
import ProductCard from '@/components/Sliders/ProductCard';
import { useSearchQuery } from '@/hooks/query';
import { Product } from '@/types/products';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import SearchNotFound from '../_components/SearchNotFound';
import { FilterNavMenu, ResultFilter } from './_components';

const ResultPageContent = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const categoryId = searchParams.get('categoryId');
  const { data, isPending, error } = useSearchQuery(query || '', categoryId || '');

  if (isPending) return <Loading />;

  if (data.data.length <= 0) return <SearchNotFound />;

  return (
    <>
      <div className="relative flex items-center justify-between p-4 bg-gray-100">
        <FilterNavMenu toggleFilterVisibility={toggleFilterVisibility}>가격</FilterNavMenu>

        {isFilterVisible && (
          <>
            <div className="absolute top-full left-0 w-full max-w-[600px] bg-white rounded-lg shadow-lg z-50">
              <ResultFilter />
            </div>

            <div className="absolute top-[calc(100%+20px)] left-0 w-full max-w-[600px] h-[4px] bg-white z-50"></div>
          </>
        )}
      </div>
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
