import { Tables } from '@/types/supabase';
import Image from 'next/image';

export interface CategoryProps {
  brand: Tables<'Brands'>;
}
const CategoryCard = ({ brand }: CategoryProps) => {
  return (
    <div className="w-[160px] h-[100px] rounded-[8px] relative basis-[1/4]">
      <Image src={brand.logoURL || ''} fill alt={brand.enName || ''} className="object-contain" unoptimized />
      <div className="w-full h-5 bg-[#302A28] flex justify-center items-center rounded-b-[8px] absolute bottom-0 ">
        <span className="text-xs text-white">{brand.krName}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
