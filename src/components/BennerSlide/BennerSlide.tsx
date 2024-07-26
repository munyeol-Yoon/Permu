"use client";

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import mockData from './../../mockup/eventBenner.json';
import Image from 'next/image';
import { type CarouselApi } from '@/components/ui/carousel';
import React from 'react';

const BennerSlide = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    if (!api) {
      return
    }
  
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
  
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  

  return (
    <div className="h-[600px] relative">
      <Carousel className="w-full h-full" setApi={setApi}>
        <CarouselContent className="h-full">
          {mockData.map((item, idx) => (
            <CarouselItem key={idx} className=" h-full">
              <div className=" h-full flex items-center justify-center">
                <Image
                  className="w-full h-full"
                  src={item.eventMainImg}
                  width={600}
                  height={600}
                  alt={`메인 배너${idx + 1}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-14 h-6 rounded-xl bg-[rgba(0,0,0,0.3)] flex justify-center items-center absolute bottom-5 right-5">
        <span className='text-[13px] text-white font-medium'>{current} / {count}+</span>
      </div>
    </div>
  );
};

export default BennerSlide;
