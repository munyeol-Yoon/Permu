'use client';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { WishProduct } from '@/hooks/query/mypage/useUserWishesQuery';
import { Product } from '@/types/products';
import BlueWishSVG from '@@/public/heart/blue-wish-icon.svg';
import WishSVG from '@@/public/heart/wish-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
export interface ProductProps {
  product: Product | WishProduct;
}

const ProductCard = ({ product }: ProductProps) => {
  const { loggedUser } = useAuth();

  const userLike = 'Wish' in product && product.Wish?.userId === loggedUser?.id;

  const price = product.price ?? 0;
  const discount = product.discount ?? 0;
  const discountAmount = price * (discount / 100);
  const resultPrice = price - discountAmount;
  const title = product.title ?? '';

  const brandName = 'Brand' in product ? product.Brand?.krName : product.Brands?.krName;
  const discountedPrice = 'discountedPrice' in product ? product.discountedPrice : 0;

  return (
    <div className="w-[180px] flex flex-col">
      <Link href={`/products/${product.productId}`}>
        <div className="relative">
          <Image
            src={product.thumbNailURL || ''}
            width={200}
            height={200}
            alt={title}
            className="w-full h-[200px] object-contain"
            unoptimized
          />
          {userLike ? (
            <BlueWishSVG className="absolute bottom-2 right-2 z-20" />
          ) : (
            <WishSVG className="absolute bottom-2 right-2 z-20" />
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        <span className="text-[12px] line-clamp-1">{brandName}</span>
        <p className="font-semibold line-clamp-1">{title.length > 7 ? title.slice(0, 7) + '...' : title}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{(discountedPrice || resultPrice || 0).toLocaleString()}원</span>
          &nbsp;
          {(product.discount || 0) > 0 && (
            <>
              <span className="flex-1 text-gray-500 text-xs line-through">{product.price?.toLocaleString()}원</span>
              <p className="font-bold text-[#FF0000]">{product.discount}%</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
