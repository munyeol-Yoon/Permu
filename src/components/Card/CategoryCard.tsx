import { Brand } from '@/types/brands';
import Image from 'next/image';

export interface CategoryProps {
  brand: Brand & { logoURL: string };
}
const CategoryCard = ({ brand }: CategoryProps) => {
  return (
    <div className="w-1/4 h-[100px] rounded-[8px] relative basis-[1/4]">
      <Image
        src={brand.logoURL || ''}
        fill
        alt={brand.enName || ''}
        className="object-contain absolute"
        quality={20}
        loading="lazy"
        sizes="(max-width: 768px) 162px, (max-width: 1200px) 162px, 100px"
      />
      <div className="w-full h-5 bg-[#302A28] flex-center rounded-b-[8px] absolute bottom-0 ">
        <span className="text-xs text-white">{brand.krName}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
