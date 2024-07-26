import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import mockData from './../../mockup/eventBenner.json';
import Image from 'next/image';

const BennerSlide = () => {
  return (
    <div className="h-[600px]">
      <Carousel className="w-full h-full">
        <CarouselContent className="w-full h-full">
          {mockData.map((item, idx) => (
            <CarouselItem key={idx} className="w-full h-full">
              <div className="w-full h-full flex items-center justify-center">
                <Image className='w-full h-full' src={item.eventMainImg} width={600} height={600} alt={`메인 배너${idx+1}`} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default BennerSlide;
