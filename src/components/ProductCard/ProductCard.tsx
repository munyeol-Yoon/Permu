import { getBrandById } from '@/api/brand';
import { Product } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  product: Product;
}

const ProductCard = async ({ product }: ProductProps) => {
  const brand = await getBrandById(`${product.brandId}`);
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
        <div className="flex flex-col">
          <span className="text-[10px] mt-2 text-clamp-1">{brand.krName}</span>
          <p className="text-[15px] font-semibold my-3">{product.title || ''}</p>
          <div className="flex justify-between">
            <p className="text-[#FF0000]">{product.discount}%</p>
            <span className="font-semibold">{(product.price || 0).toLocaleString()}원</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
