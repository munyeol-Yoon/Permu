import { Brand } from '@/types/brands';
import { Product } from '@/types/products';

import { CategoryCard, ProductCard } from '../Card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

type SliderData = Brand | Product;

type SlidersProps = {
  data: SliderData[];
  count: number;
};

const Sliders = ({ data, count }: SlidersProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {data?.map((item, index) => (
          <CarouselItem key={index} className={`basis-1/${count}`}>
            {'productId' in item ? (
              <ProductCard key={item.productId} product={item as Product} />
            ) : (
              <CategoryCard key={item.brandId} brand={item as Brand & { logoURL: string }} />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sliders;
