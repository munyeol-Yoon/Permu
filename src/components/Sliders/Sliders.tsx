import { Product } from '@/types/products';
import { Tables } from '@/types/supabase';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';
type SlidersProps = {
  data: Tables<'Brands'>[] | Product[];
  count: number;
};
const chunkArray = (data: SlidersProps['data'], count: SlidersProps['count']) => {
  const result = [];
  for (let i = 0; i < data.length; i += count) {
    result.push(data.slice(i, i + count));
  }
  return result;
};

const Sliders = ({ data, count }: SlidersProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {chunkArray(data, count).map((brandChunk, index) => (
          <CarouselItem className="flex-row-10" key={index}>
            {brandChunk.map((data) =>
              'productId' in data ? (
                <ProductCard key={data.productId} product={data} />
              ) : (
                <CategoryCard key={data.brandId} brand={data} />
              )
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sliders;
