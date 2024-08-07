import Image from 'next/image';

interface OrderItemProps {
  thumbNailURL: string;
  title: string;
  date: string;
}

const OrderItem = ({ thumbNailURL, title, date }: OrderItemProps) => {
  return (
    <div className="flex gap-x-5 my-3">
      <div className="w-[100px] h-[100px] aspect-square relative">
        <Image src={thumbNailURL || ''} alt={title || ''} className="object-cover" fill />
      </div>
      <div className="flex flex-col gap-y-2.5">
        <p>구매일 : {date}</p>
        <p className="text-base font-semibold line-clamp-1">{title}</p>
        <p className="text-muted">옵션 :</p>
      </div>
    </div>
  );
};

export default OrderItem;
