import Image from 'next/image';

interface ProductProps {
  brand: string;
  name: string;
  price: number;
  discountPercentage: number;
}

const ProductCard = ({ brand, name, price, discountPercentage }: ProductProps) => {
  return (
    <div className="w-[180px] flex flex-col">
      <Image
        src="https://web-resource.tamburins.com/catalog/product/1662463782/7ce111a8-c961-4048-8ae0-6c349b44a17c/Thumbnail_Perfume1_50ml_UnknownOud.jpg"
        width={180}
        height={200}
        alt="제품 이미지"
        className="rounded"
      />
      <div className="flex flex-col">
        <span className="text-[10px] mt-2">{brand}</span>
        <p className="text-[15px] font-semibold my-3">{name}</p>
        <div className="flex justify-between">
          <p className="text-[#FF0000]">{discountPercentage}%</p>
          <span className="font-semibold">{price.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;