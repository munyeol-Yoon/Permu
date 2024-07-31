import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface CartItemProps {
  cartItem: any;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  return (
    <li className="flex items-center px-5">
      <Checkbox />
      <div className="relative aspect-square max-w-[100px] h-[120px] mx-[33px]">
        <Image src={cartItem.Products.thumbNailURL} fill alt="" className="absolute" />
      </div>
      <div className="flex flex-col px-2.5 w-full">
        <div className="flex justify-between items-center">
          <p className="text-xs mb-1">{cartItem.Products.Brands.enName}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
            <path d="M13 0.500001L1 12.5M13 12.5L1 0.5" stroke="#231815" />
          </svg>
        </div>
        <p className="font-semibold mb-2.5">{cartItem.Products.title}</p>
        <p className="text-xs text-[#B3B3B3] mb-1.5">TODO: 해당 제품의 옵션 추가</p>
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" className="text-xs border-black rounded-none px-2.5 py-2">
            TODO: 해당 제품의 옵션 변경
          </Button>
          <p className="text-xs">{cartItem.Products.discountedPrice ?? cartItem.Products.price}원</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
