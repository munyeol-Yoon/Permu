import { HOME } from '@/constant/pathname';
import Image from 'next/image';
import Link from 'next/link';

interface EventLinkCardProps {
  item: {
    ThumbnailImg: string;
    title: string;
  };
}

const EventLinkCard = ({ item }: EventLinkCardProps) => {
  return (
    <div key={item.title} className="flex flex-col items-center">
      <Link href={HOME} className="w-[72px] h-[72px]">
        <Image className="rounded-[14px] h-[72px]" src={item.ThumbnailImg} width={72} height={72} alt={item.title} />
      </Link>
      <span className="text-xs mt-1 font-bold">{item.title}</span>
    </div>
  );
};

export default EventLinkCard;
