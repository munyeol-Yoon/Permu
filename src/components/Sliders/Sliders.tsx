import { Product } from '@/types/products';
import { Tables } from '@/types/supabase';
import { useCallback, useMemo } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';

type SliderData = Tables<'Brands'> | Product;

type SlidersProps = {
  data: SliderData[];
  count: number;
};

const chunkArray = (data: SliderData[], chunkSize: number): SliderData[][] => {
  const result: SliderData[][] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }
  return result;
};

const Sliders = ({ data, count }: SlidersProps) => {
  const chunks = useMemo(() => chunkArray(data, count), [data, count]);

  const renderCarouselItem = useCallback(
    (item: SliderData) =>
      'productId' in item ? (
        <ProductCard key={item.productId} product={item as Product} />
      ) : (
        <CategoryCard key={item.brandId} brand={item as Tables<'Brands'>} />
      ),
    []
  );

  return (
    <Carousel>
      <CarouselContent>
        {chunks.map((chunk, index) => (
          <CarouselItem key={index} className="flex-row-10">
            {chunk.map((item) => renderCarouselItem(item))}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sliders;
