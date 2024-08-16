'use client';
import useAlert from '@/hooks/useAlert';
import MockData from '@/mockup/banner.json';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface EventLinkCardProps {
  item: {
    ThumbnailImg: string;
    title: string;
  };
}

const EventLinkCard = () => {
  const { showInfoAlert } = useAlert();
  const handleClick = (item: EventLinkCardProps['item']) => showInfoAlert('준비중입니다!');
  return (
    <Carousel>
      <CarouselContent className="p-5-2">
        {MockData.map((item) => (
          <CarouselItem
            className="basis-1/4 sm:basis-1/6 rounded-[14px] flex flex-col"
            key={item.title}
            onClick={() => handleClick(item)}
          >
            <div className="relative w-[72px] h-[72px]">
              <Image
                className="absolute object-cover w-[72px] h-[72px]"
                src={item.ThumbnailImg}
                fill
                alt={item.title}
              />
            </div>
            <div className="relative w-[72px] flex-col-10 justify-center">
              <span className="text-center text-xs mt-1 font-bold">{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default EventLinkCard;
