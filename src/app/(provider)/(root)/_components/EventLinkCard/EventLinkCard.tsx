import Image from 'next/image';
import Link from 'next/link';

interface itemProps {
  item: {
    ThumbnailImg: string;
  };
}

function EventLinkCard({ item }: itemProps) {
  return (
    <div className="flex flex-col items-center">
      <Link href="/" className="w-[72px] h-[72px]">
        <Image
          className="rounded-[14px] h-[72px]"
          src={item.ThumbnailImg}
          width={72}
          height={72}
          alt={`이벤트 이미지`}
        />
      </Link>
      <span className="text-xs mt-1">첫구매 혜택</span>
    </div>
  );
}

export default EventLinkCard;
