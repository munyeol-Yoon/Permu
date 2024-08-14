import { Brand } from '@/types/brands';
import { Product } from '@/types/products';
import { useCallback, useMemo } from 'react';

import { CategoryCard, ProductCard } from '../Card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

type SliderData = Brand | Product;

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
        <div className="w-1/3" key={item.productId}>
          <ProductCard product={item as Product} />
        </div>
      ) : (
        <CategoryCard key={item.brandId} brand={item as Brand & { logoURL: string }} />
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
