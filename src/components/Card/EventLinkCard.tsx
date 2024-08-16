'use client';
import useAlert from '@/hooks/useAlert';
import MockData from '@/mockup/banner.json';
import Image from 'next/image';

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
    <div className="w-full flex-row-10 p-5-2 justify-between">
      {MockData.map((item) => (
        <div key={item.title} className="flex flex-col items-center cursor-pointer">
          <div
            className="relative rounded-[14px] w-[50px] h-[50px] xl:w-[72px] xl:h-[72px]"
            onClick={() => handleClick(item)}
          >
            <Image className="absolute object-contain" src={item.ThumbnailImg} fill alt={item.title} />
          </div>
          <span className="text-xs mt-1 font-bold">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default EventLinkCard;
