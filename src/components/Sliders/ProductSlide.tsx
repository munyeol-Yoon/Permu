'use client';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';
type SliderProps = { Images?: { ImageURL: string; title: string }[] };
const ProductSlide = ({ Images }: SliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel className="w-full h-[600px]" setApi={setApi}>
        <CarouselContent className="h-full">
          {Images?.map((image, idx) => (
            <CarouselItem key={idx}>
              <div className="flex items-center justify-center relative w-full h-full">
                <Image
                  src={image.ImageURL}
                  fill
                  className="object-cover w-full h-full"
                  alt={image.title}
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 600px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {current > 0 && (
        <div className="w-14 h-6 rounded-xl bg-[rgba(0,0,0,0.3)] flex justify-center items-center absolute bottom-5 right-5">
          <span className="text-[13px] text-white font-medium">
            {current} / {Images?.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductSlide;
