import mockData from '@/mockup/eventBenner.json';
import Image from 'next/image';
import Link from 'next/link';
interface itemProps {
  item: {
    ThumbnailImg: string;
    title: string;
  };
}

const EventLinkCard = () => {
  return (
    <div className="flex justify-between p-8">
      {mockData.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <Link href="/" className="w-[72px] h-[72px]">
            <Image
              className="rounded-[14px] h-[72px]"
              src={item.ThumbnailImg}
              width={72}
              height={72}
              alt={`이벤트 이미지`}
            />
          </Link>
          <span className="text-xs mt-1">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default EventLinkCard;
