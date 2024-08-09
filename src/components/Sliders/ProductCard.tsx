'use client';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useWishesMutation } from '@/hooks/mutation';
import { WishProduct } from '@/hooks/query/mypage/useUserWishesQuery';
import useAlert from '@/hooks/useAlert';
import { Product } from '@/types/products';
import BlueWishSVG from '@@/public/heart/blue-wish-icon.svg';
import WishSVG from '@@/public/heart/wish-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface ProductProps {
  product: Product | WishProduct;
}

const ProductCard = ({ product }: ProductProps) => {
  const router = useRouter();
  const { loggedUser } = useAuth();
  const { showInfoAlert } = useAlert();
  const userLike = 'Wish' in product && product.Wish?.userId === loggedUser?.id;

  const price = product.price ?? 0;
  const discount = product.discount ?? 0;
  const discountAmount = price * (discount / 100);
  const resultPrice = price - discountAmount;
  const title = product.title ?? '';

  const brandName = 'Brand' in product ? product.Brand?.krName : product.Brands?.krName;
  const discountedPrice = 'discountedPrice' in product ? product.discountedPrice : 0;
  const addMutation = useWishesMutation({
    data: 'Wish' in product ? product.Wish : null,
    productId: Number(product.productId)
  });

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!loggedUser) {
      showInfoAlert('로그인이 필요한 서비스 입니다');
      router.push('/auth/log-in');
    } else addMutation.mutate();
  };

  return (
    <div className="w-1/3 h-[240px] md:w-[180px] md:h-[281px] flex flex-col mt-[16px]">
      <div className="w-full h-full relative">
        <Link href={`/products/${product.productId}`}>
          <Image
            src={product.thumbNailURL || ''}
            fill
            alt={title}
            className="object-contain bg-[#FFFBEE]"
            unoptimized
          />
        </Link>
        <div
          className="absolute bottom-2 right-2 z-20 w-[30px] h-[30px] flex items-center justify-center hover:cursor-pointer"
          onClick={(e) => handleWish(e)}
        >
          {userLike ? <BlueWishSVG /> : <WishSVG />}
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs sm:text-[12px] line-clamp-1">{brandName}</span>
        <p className="font-semibold line-clamp-1">{title.length > 7 ? title.slice(0, 7) + '...' : title}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm sm:text-base whitespace-pre">
            {(discountedPrice || resultPrice || 0).toLocaleString()}원
          </span>
          &nbsp;
          {(product.discount || 0) > 0 && (
            <>
              <span className="hidden sm:block flex-1 text-gray-500 text-xs line-through">
                {product.price?.toLocaleString()}
              </span>
              <p className="font-bold text-[#FF0000] text-sm sm:text-base">{product.discount}%</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
