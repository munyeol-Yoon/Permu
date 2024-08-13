'use client';

import Loading from '@/components/Loading';
import ProductCard from '@/components/Sliders/ProductCard';
import { useSearchQuery } from '@/hooks/query';
import { Product } from '@/types/products';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import SearchNotFound from '../_components/SearchNotFound';
import { FilterNavMenu, ResultFilter } from './_components';

export type FilterCriteriaType = {
  priceRange: number[];
  priceType: 'all' | 'high' | 'low'; // 높은 가격순, 낮은 가격순, 무료 교환 반품(비활성화)
  benefit: 'discount' | 'freeShipping' | 'freeExchange' | 'none';
};

const ResultPageContent = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteriaType>({
    priceRange: [1000, 200000000],
    priceType: 'all',
    benefit: 'none'
  });

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const categoryId = searchParams.get('categoryId');
  const { data, isPending, error } = useSearchQuery(query || '', categoryId || '');

  if (isPending) return <Loading />;

  if (data.data.length <= 0) return <SearchNotFound />;

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      const price = product.price ?? 0;
      const discount = product.discount ?? 0;

      const withinPriceRange = price >= filterCriteria.priceRange[0] && price <= filterCriteria.priceRange[1];
      // const matchesPriceType = filterCriteria.priceType === 'all' || (filterCriteria.priceType === 'discounted' && discount > 0);
      return withinPriceRange;
    });
  };

  const filteredProducts = filterProducts(data.data);

  return (
    <>
      <div className="relative flex items-center justify-between p-4 bg-gray-100">
        <FilterNavMenu toggleFilterVisibility={toggleFilterVisibility}>가격</FilterNavMenu>

        {isFilterVisible && (
          <>
            <div className="absolute top-full left-0 w-full max-w-[600px] bg-white rounded-lg shadow-lg z-50">
              <ResultFilter data={data.data} setFilterCriteria={setFilterCriteria} />
            </div>

            <div className="absolute top-[calc(100%+20px)] left-0 w-full max-w-[600px] h-[4px] bg-white z-50"></div>
          </>
        )}
      </div>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {filteredProducts.map((productItem: Product) => (
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
