'use client';
import { getProductsByBrandForThisWeek, getProductsByCategoryForThisWeek } from '@/api/product';
import CategoryMore from '@/components/CategoryMore';
import Sliders from '@/components/Sliders';
import { Product } from '@/types/products';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CategorySectionProps {
  title: string;
  option: string;
  count: number;
}

const CategorySection = ({ title, option, count }: CategorySectionProps) => {
  const [brands, setBrands] = useState<Product[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data =
        option === 'product' ? await getProductsByCategoryForThisWeek() : await getProductsByBrandForThisWeek();
      setBrands(data);
    };
    fetchBrands();
  }, [option, title]);

  return (
    <div className="flex flex-col mt-[46px] p-5-2">
      <CategoryMore title={option === 'product' ? title + '인센스' : title + (brands[0]?.Brand?.krName ?? '')} />

      <div className="w-full h-[300px] rounded mb-[16px]">
        <Image
          src={
            option === 'product'
              ? 'https://s3-alpha-sig.figma.com/img/1e1b/af85/252296ae4dd1157d5ddc83a8aa5d2509?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iB4M7Sqqav6whxvpJEEH-53TX4-byWEsrn2NKH5jzGYcfGElvdpW1DNQXX7b48s0rWc9sW-lIfJIR8t~T4eWMyr4tf4TlR2RtRYCtqHOhGgVVDvTRp~3VFyemrGHZxHZILCBDEDOSetk-hDZwtdzR5DhYZ7C7lmWGDHeD2dfkq2uBWbd1BPO24~ObUhQAzHrC7AOs0cy87N7t9aOrf4XKOu~yI79CYiKb43FeR2SEPZaGTq6716LfLMVO4hMftAVyMpoBZ~MjXPTKdNb1cwxKfNJrblJTtJP6qHNrTW5gcusePvIohSrJLPhGeTml0sNOf7s1X0GTBORrmEW~XJKnQ__'
              : 'https://s3-alpha-sig.figma.com/img/975e/5d72/a7a7ef80b4924da5051a1850d4c903f3?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CmHSAheenZlenknPYNOk4mwq7LtYjaK2b91pF-zEfFBebq1OpgRArzzQYo85fOzf1TpJGIx9-~9T0IISwsIBHjgbTdmpnb~nWMGevgli46VCAQ6yp5CNP8ORmhpPZdnj62~XP1PTCqa-9BsIvHuBpQ4qLYAKvuSOV2bZNf-NqRdpIIX5Cd5YwhMTGqIZMc1WUp6d4TCTsBxvlORZ1n652zgifZJePNQdAhFJ433O7BodyNfADenswcL5afwr9HXyGOHZfhsAL4RvVqeYsJ~ZcadcifEEQNNNYEV1AGG-n5gHEEE0A8ZvIpXR8aDJMKsJCHc2ywqixOqn8ONkN~iPEg__'
          }
          width={570}
          height={300}
          alt={brands[0]?.Brand?.krName ?? ''}
          className="w-full h-[300px]"
        />
      </div>

      <Sliders data={brands} count={count} />
    </div>
  );
};

export default CategorySection;
