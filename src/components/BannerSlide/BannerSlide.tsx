'use client';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import mockData from '@/mockup/banner.json';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useEffect, useState } from 'react';
type SliderProps = { Images?: { ImageURL: string; title: string }[] };
const BannerSlide = ({ Images }: SliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(Images ? Images.length : api.scrollSnapList().length);
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
          {!Images
            ? mockData.map((item, idx) => (
                <CarouselItem key={idx} className="h-full">
                  <div className="h-full flex items-center justify-center relative">
                    <div className="bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 bottom-0 right-0"></div>
                    <Image
                      className="w-full h-full object-contain"
                      src={item.ImageURL}
                      width={600}
                      height={600}
                      alt={`메인 배너${idx + 1}`}
                    />
                    <div className="absolute left-[14px] bottom-[51px]">
                      <h2 className="font-bold text-[30px] text-white">Permeate 신규 런칭 이벤트</h2>
                      <p className="text-[26px] text-white mt-[21px]">추천 상품 최대 30% 쿠폰증정 </p>
                    </div>
                  </div>
                </CarouselItem>
              ))
            : Images.map((image, idx) => (
                <CarouselItem key={idx} className="h-full">
                  <div className="h-full flex items-center justify-center relative">
                    <Image src={image.ImageURL} fill className="object-contain" alt={image.title} />
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

export default BannerSlide;
