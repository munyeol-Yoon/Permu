'use client';
import CategoryMore from '@/components/CategoryMore';
import ProductCard from '@/components/ProductCard';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import { Product } from '@/types/products';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

type SlidersProps = {
  data: Product[];
  count: number;
};
const chunkArray = (data: SlidersProps['data'], count: SlidersProps['count']) => {
  const result = [];
  for (let i = 0; i < data.length; i += count) {
    result.push(data.slice(i, i + count));
  }
  return result;
};

const CurrentProducts = ({ title, option }: { title: string; option: string }) => {
  const { data: products } = useProductsQuery(option);

  return (
    <div className="flex flex-col p-5-2">
      <CategoryMore title={title} />

      <Carousel>
        <CarouselContent>
          {chunkArray(products ?? [], 3).map((brandChunk, index) => (
            <CarouselItem className="flex-row-10" key={index}>
              {brandChunk.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CurrentProducts;
