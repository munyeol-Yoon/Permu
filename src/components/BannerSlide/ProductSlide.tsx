'use client';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useEffect, useState } from 'react';
type SliderProps = { Images?: { ImageURL: string; title: string }[] };
const ProductSlide = ({ Images }: SliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount((Images ?? []).length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [Images, api]);

  return (
    <div className="h-[600px] relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false
          })
        ]}
        className="w-full h-full "
        setApi={setApi}
      >
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
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-14 h-6 rounded-xl bg-[rgba(0,0,0,0.3)] flex justify-center items-center absolute bottom-5 right-5">
        <span className="text-[13px] text-white font-medium">
          {current} / {count}+
        </span>
      </div>
    </div>
  );
};

export default ProductSlide;
