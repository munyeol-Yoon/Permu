'use client';
import { Product } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="w-[180px] flex flex-col">
      <Link href={`/products/${product.productId}`}>
        <Image
          src={product.thumbNailURL || ''}
          width={180}
          height={200}
          alt={product.title || ''}
          className="rounded bg-#FFFBEE"
        />
        <div className="flex-col-10">
          <span className="text-[12px] line-clamp-1">{product.Brand?.krName}</span>
          <p className="font-semibold line-clamp-1">{product.title || ''}</p>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{(product.discountedPrice || 0).toLocaleString()}원</span>&nbsp;
            {(product.discount || 0) > 0 && (
              <>
                <span className="flex-1 text-gray-500 text-sm line-through">{product.price?.toLocaleString()}원</span>
                <p className="text-semibold text-[#FF0000]">{product.discount}%</p>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
