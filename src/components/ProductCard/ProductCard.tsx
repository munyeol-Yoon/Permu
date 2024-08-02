import Image from 'next/image';

interface ProductProps {
  brand: string;
  name: string;
  price: number;
  discountPercentage: number;
  thumbNailURL: string;
}

const ProductCard = ({ brand, name, price, discountPercentage, thumbNailURL }: ProductProps) => {
  return (
    <div className="w-[180px] flex flex-col">
      <Image src={thumbNailURL} width={180} height={200} alt="제품 이미지" className="rounded" />
      <div className="flex flex-col">
        <span className="text-[10px] mt-2">{brand}</span>

        <p
          className="text-[15px] font-semibold my-3 h-[45px]"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordWrap: 'break-word'
          }}
        >
          {name}
        </p>
        <div className="flex justify-between">
          <p className="text-[#FF0000]">{discountPercentage}%</p>
          <span className="font-semibold">{price.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
