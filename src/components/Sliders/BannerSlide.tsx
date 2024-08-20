'use client';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import bannerData from '@/mockup/mainBanner.json';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const BannerSlide = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="h-[600px] relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false
          })
        ]}
        className="w-h-full"
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {bannerData.map((item, idx) => (
            <CarouselItem key={idx} className="h-full">
              <Link href={item.eventLink}>
                <div className="h-full flex items-center justify-center relative">
                  <div className="bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 bottom-0 right-0"></div>
                  <Image
                    className="w-h-full object-cover"
                    src={item.ImageURL}
                    width={600}
                    height={600}
                    alt={`메인 배너${idx + 1}`}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 600px"
                  />
                  <div className="absolute left-8 bottom-[51px]">
                    <h2 className="text-3xl font-bold text-white">{item.title}</h2>
                    <p className="text-2xl font-normal text-white mt-5">{item.subTitle}</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-14 h-6 rounded-xl bg-[rgba(0,0,0,0.3)] flex-center absolute bottom-5 right-5">
        <span className="text-[13px] text-white font-medium">
          {current} / {count}+
        </span>
      </div>
    </div>
  );
};

export default BannerSlide;
