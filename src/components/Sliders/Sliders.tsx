import CategorySectionItem from '@/app/(provider)/(root)/_components/CategorySection/CategorySectionItem';
import { Tables } from '@/types/supabase';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
type SlidersProps = {
  data: Tables<'Brands'>[];
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
            {brandChunk.map((brand) => (
              <CategorySectionItem key={brand.brandId} brand={brand} />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Sliders;
