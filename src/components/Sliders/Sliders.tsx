import CategorySectionItem from '@/app/(provider)/(root)/_components/CategorySection/CategorySectionItem';
import { Product } from '@/types/products';
import { Tables } from '@/types/supabase';
import ProductCard from '../ProductCard';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
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
                <ProductCard key={data.productId} product={data as Product} />
              ) : (
                <CategorySectionItem key={data.brandId} brand={data as Tables<'Brands'>} />
              )
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sliders;
