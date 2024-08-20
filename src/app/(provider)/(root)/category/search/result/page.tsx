'use client';

import ProductCard from '@/components/Card/ProductCard';
import Loading from '@/components/Loading';
import { useSearchQuery } from '@/hooks/query';
import { Product } from '@/types/products';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import SearchNotFound from '../_components/SearchNotFound';
import { FilterNavMenu, ResultFilter } from './_components';

export type FilterCriteriaType = {
  priceRange: number[];
  priceType: 'all' | 'high' | 'low';
  benefit: 'discount' | 'none';
};

const ResultPageContent = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteriaType>({
    priceRange: [1000, 200000000],
    priceType: 'all',
    benefit: 'none'
  });
  const [filterOrder, setFilterOrder] = useState<'pricePoint' | 'priceType' | 'benefits'>('pricePoint');

  const toggleFilterVisibility = (newFilterOrder: 'pricePoint' | 'priceType' | 'benefits') => {
    if (filterOrder === newFilterOrder) {
      setIsFilterVisible(!isFilterVisible);
    } else {
      setFilterOrder(newFilterOrder);
      setIsFilterVisible(true);
    }
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const categoryId = searchParams.get('categoryId');
  const { data, isPending, error } = useSearchQuery(query || '', categoryId || '');

  if (isPending) return <Loading />;

  if (data.data.length <= 0) return <SearchNotFound />;

  const filterProducts = (products: Product[]) => {
    const filtered = products.filter((product) => {
      const price = product.price ?? 0;
      const withinPriceRange = price >= filterCriteria.priceRange[0] && price <= filterCriteria.priceRange[1];
      const isDiscounted =
        filterCriteria.benefit === 'none' || (filterCriteria.benefit === 'discount' && product.discount);

      return withinPriceRange && isDiscounted;
    });

    if (filterCriteria.priceType === 'high') {
      return filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (filterCriteria.priceType === 'low') {
      return filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }

    return filtered;
  };

  const filteredProducts = filterProducts(data.data);

  return (
    <>
      <div className="relative flex items-center p-4 bg-gray-100">
        <FilterNavMenu
          onClick={() => toggleFilterVisibility('pricePoint')}
          isActive={isFilterVisible && filterOrder === 'pricePoint'}
        >
          가격대
        </FilterNavMenu>
        <FilterNavMenu
          onClick={() => toggleFilterVisibility('priceType')}
          isActive={isFilterVisible && filterOrder === 'priceType'}
        >
          가격 유형
        </FilterNavMenu>
        <FilterNavMenu
          onClick={() => toggleFilterVisibility('benefits')}
          isActive={isFilterVisible && filterOrder === 'benefits'}
        >
          혜택 정보
        </FilterNavMenu>

        {isFilterVisible && (
          <>
            <div className="absolute top-full left-0 w-full max-w-[600px] bg-white rounded-lg shadow-lg z-50">
              <ResultFilter
                data={data.data}
                setFilterCriteria={setFilterCriteria}
                onClose={() => setIsFilterVisible(false)}
                filterOrder={filterOrder}
              />
            </div>

            <div className="absolute top-[calc(100%+20px)] left-0 w-full max-w-[600px] h-[4px] bg-white z-50"></div>
          </>
        )}
      </div>

      <div className="container mx-auto p-5">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
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
