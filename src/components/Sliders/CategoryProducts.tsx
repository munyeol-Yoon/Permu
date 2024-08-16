'use client';
import CategoryMore from '@/components/CategoryMore';
import { Sliders } from '@/components/Sliders';
import useProductsQuery from '@/hooks/query/useProductsQuery';
import Image from 'next/image';

interface CategorySectionProps {
  title: string;
  option: string;
  count: number;
}

const CategorySection = ({ title, option, count }: CategorySectionProps) => {
  const { data: brands = [] } = useProductsQuery(option);

  return (
    <div className="flex flex-col p-5-2">
      <CategoryMore title={option === 'product' ? title + '인센스' : title + (brands[0]?.Brand?.krName ?? '')} />

      <div className="w-full h-[300px] rounded my-4 relative">
        <Image
          src={
            option === 'product'
              ? 'https://www.jejutwn.com/data/photos/20211248/art_16383214817079_6af19a.png'
              : 'https://s3-alpha-sig.figma.com/img/975e/5d72/a7a7ef80b4924da5051a1850d4c903f3?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CmHSAheenZlenknPYNOk4mwq7LtYjaK2b91pF-zEfFBebq1OpgRArzzQYo85fOzf1TpJGIx9-~9T0IISwsIBHjgbTdmpnb~nWMGevgli46VCAQ6yp5CNP8ORmhpPZdnj62~XP1PTCqa-9BsIvHuBpQ4qLYAKvuSOV2bZNf-NqRdpIIX5Cd5YwhMTGqIZMc1WUp6d4TCTsBxvlORZ1n652zgifZJePNQdAhFJ433O7BodyNfADenswcL5afwr9HXyGOHZfhsAL4RvVqeYsJ~ZcadcifEEQNNNYEV1AGG-n5gHEEE0A8ZvIpXR8aDJMKsJCHc2ywqixOqn8ONkN~iPEg__'
          }
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          alt={brands[0]?.Brand?.krName ?? '이미지'}
          loading="eager"
        />
      </div>

      <Sliders data={brands} count={count} />
    </div>
  );
};

export default CategorySection;
